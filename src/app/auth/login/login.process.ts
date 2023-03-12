import { Observable, ReplaySubject, Subject } from "rxjs";
import { homeProcess } from "src/app/home/home.process";
import { AppDataStoreService } from "src/app/state-transitions-config/app-data-store.service";
import { AppEventModel } from "src/app/state-transitions-config/app-event.model";
import { AppEvent } from "src/app/state-transitions-config/app-events.enum";

/**
 * This function supports the following state transitions:
 * 
 *  LOGINVIEW    -> login  -> processLogin()  -> success  -> LOGINSUCCESS
 *  LOGINSUCCESS -> home   -> processHome()   -> success  -> HOMEVIEW
 * 
 * 
 *  * TODO: need to add a new transition for login error
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns AppEventModel
 */
export function loginProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): Observable<AppEvent> {
    const user = appEventModel.appData.user;
    var result = new ReplaySubject<AppEvent>();
    console.log(">> before login user: ", user);
    if (user && user.loginId) {
        // TODO: implement login error handling
        appDataStore.login(user.loginId).subscribe(user => {
            console.log(">> after login user: ", user);
            appDataStore.setUser(user);
            result.next(AppEvent.success);
            // internally trigger the "home" event
            // homeProcess(appEventModel, appDataStore).subscribe(homeResult => {
            //     console.log(">> homeResult: ", homeResult);
            //     result.next(homeResult);
            // });
        });
    } else {
        result.next(AppEvent.unknown);
    }
    console.log(">> returning from login");
    return result.asObservable();
}