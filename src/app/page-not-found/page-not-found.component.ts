import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';
import { AppState } from '../state-transitions-config/app-states.enum';
import { AppEventModel } from '../state-transitions-config/app-event.model';

/**
 * This Angular component displays an error message
 * when the navigation request does not conform to one of the
 * the pre-configured state transitions.
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent extends BaseComponent implements OnInit {

  message = '';

  constructor(protected override location: Location, protected override router: Router, 
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
    const navigationExtras = router.getCurrentNavigation()?.extras;
    if (navigationExtras && navigationExtras.state && navigationExtras.state['appEventModel']) {
      const appEventModel: AppEventModel = navigationExtras.state['appEventModel'];
      this.message = appEventModel.message;
    }
  }

  override ngOnInit(): void {
    this.appDataStore.setCurrentState(AppState.UNKNOWN);
    if (!this.message) {
      this.message = 'Unknown access error';
    }
  }
}
