import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppData } from '../state-transitions-config/app-data.model';
import { AppEventModel } from '../state-transitions-config/app-event.model';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppState } from '../state-transitions-config/app-states.enum';
import { EventToProcessConfig } from '../state-transitions-config/state-transitions.config';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';

/**
 * This "Smart Component" ensures that only the pre-configured view transitions are allowed.
 * View transitions by clicking browser Back button or accessing bookmarked intermediate app URLs (like /products),
 * are prevented and redirected to "Page not Found" page. However, the bookmarked URL navigation can 
 * be supported by expicitly configuring in the state-transitions.config.ts file. See the file comments in
 * state-transitions.config.ts. To support Back button navigation remove the preTransitionData property in 
 * app-data-store.service.ts.
 */
@Component({
  selector: 'app-base', template: ``
})
export class BaseComponent implements OnInit {
 
  protected appEventModel = new AppEventModel();

  // TODO: add ActivatedRoute to the arguments to read data in app-routing.module.ts for authorization purposes
  constructor(protected location: Location, protected router: Router, 
    protected appDataStore: AppDataStoreService) {
    console.log('>> received url: ', router.url);
    if (router.url !== '/' && router.url !== '/login') {
      if (router.getCurrentNavigation()) {
        const navigationExtras = router.getCurrentNavigation()?.extras;
        if (navigationExtras && navigationExtras.state && navigationExtras.state['trsnData']) {
          this.appEventModel = navigationExtras.state['trsnData'];
          if (appDataStore.getPreTransitonData().appState !== this.appEventModel.appState) {
            const aem = appDataStore.getPreTransitonData();
            console.log('>> user clicked browser Back button, restore the view');
            // the user clicked browser Back button, restore the view
            this.doTransition(appDataStore, aem.appEvent, aem.appState, aem.appData);
          } else {
            if (router.url === '/home') {
              this.doTransition(appDataStore, AppEvent.home, AppState.LOGINSUCCESS);
            } else {
              console.log('>> process function has already been called');
              console.log('>> back to the extending component');
            }
          }
        } else {
          // the user edits the url in the midst of view transitions
          console.log('>> the user accessed an unsupported url: ', router.url);
          router.navigate(['/**']);
        }
      } else {
        console.log('>> unrecognized navigation: ', router.url);
        router.navigate(['/**']);
      }
    } else {
      console.log('>> Let Angular handle this path: ', router.url);
      console.log('>> back to the extending component');
    }
  }

  ngOnInit() {}

  /**
   * This is the "engine" of the Smart Component. It ensures that only pre-configured
   * view transitions succeed. It uses the appState and appEvent to validate each transition.
   * All supported view transitions are pre-configured in state-transitions.config.ts
   * 
   * TODO: This method can be modified to check whether the user is authenticated and authorized
   * by adding a user property in the AppData class. A login component can populate the appData.user
   * Also see the file comments in state-transitions.config.ts.
   * 
   * @param appDataStore 
   * @param appEvent 
   * @param appState 
   * @param appData 
   * @returns AppEventModel
   */
  protected doTransition(appDataStore: AppDataStoreService, appEvent: AppEvent, appState: AppState, appData?: AppData): void {
    let appEventModel = new AppEventModel();

    var user = appDataStore.getUser();
    var curPath = this.router.url;

    // if (!user || !user.loginId) {
    //   user = appData?.user;
    // }
    console.log(">> is appData user? ", (appData && appData.user && appData.user.loginId) ? 'tru' : 'flse');
    console.log(">> is store user? ", (user && user.loginId) ? 'tru' : 'flse');
    // check for authentication
    if ((appData && appData.user && appData.user.loginId) || (user && user.loginId)) {

      const requiredRoles: string[] | undefined = EventToProcessConfig[appEvent].roles;
      // authorize the user
      // if requiredRoles is specified in app-routing.module.ts then check whether the user has the role
      if (!requiredRoles || (user?.role && requiredRoles.includes(user.role))) {
        // put the user in the store
        // If a path is configured in state-transition.config.ts for the appState and appEvent.

        appEventModel.appEvent = appEvent;
        appEventModel.appState = appState;
        appEventModel.appData = appData!;

        // store the transition data so it an be used to restore a previous transition
        // This is used to restore a view if the user happens to click the browser's Back button
        appDataStore.setPreTransitonData({ appEvent, appState, appData: appData ? appData : new AppData() });

        // Call the process to pre-fetch data for the view
        console.log(">> calling processor...");
        EventToProcessConfig[appEvent]['process'](appEventModel, appDataStore).subscribe((finalEvt) => {
          // construct a final state like LOGINERROR
          const finalState = (appEvent + finalEvt).toUpperCase();
          console.log(">> finalState: ", finalState);
          appDataStore.setCurrentState(AppState[finalState as keyof typeof AppState]);
          if (finalEvt.toString().endsWith("success")) {
            console.log(">> navTo, resultEvent: ", EventToProcessConfig[appEvent].successPath, appState);
            this.router.navigate([EventToProcessConfig[appEvent].successPath], { state: { trsnData: appDataStore.getPreTransitonData() } });
          } else {
            // process error, send the user back to the same page
            console.log(">> process Result: navTo: ", finalEvt, EventToProcessConfig[appEvent].errorPath);
            this.router.navigate([EventToProcessConfig[appEvent].errorPath], { state: { trsnData: appDataStore.getPreTransitonData() } });
          }
        });

      } else {
        console.log(">> user not found: ", appEvent, appState, this.router.url);
        // TODO: implement login error transition
        this.router.navigate(['/**']);
      }
    }
  }
}
