import { Observable, ReplaySubject, Subject } from "rxjs";
import { homeProcess } from "src/app/home/home.process";
import { AppDataStoreService } from "src/app/state-transitions-config/app-data-store.service";
import { AppEventModel } from "src/app/state-transitions-config/app-event.model";
import { AppEvent } from "src/app/state-transitions-config/app-events.enum";

/**
 * This function pre-fetches data for the login page
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns Observable<AppEvent>
 */
export function loginProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): Observable<AppEvent> {
    const user = appEventModel.appData.user;

    console.log(">> before login user: ", user);

    // TODO: implement login error handling
    return appDataStore.login(user?.loginId);
}