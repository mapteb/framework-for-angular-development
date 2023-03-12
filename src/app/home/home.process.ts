import { AppEventModel } from "../state-transitions-config/app-event.model";
import { AppEvent } from "../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../state-transitions-config/app-data-store.service";
import { Observable, of, Subject } from "rxjs";

/**
 * This function supports the following state transitions:
 * 
 *  LOGINSUCCESS  -> home     -> processHome()     -> success     -> HOMEVIEW
 * 
 *  This function also enforces the user role required to process the request
 * 
 *  * TODO: need to add a new transition for home_error
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns AppEventModel
 */
export function homeProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): Observable<AppEvent> {
    console.log(">> processing home request");
    return of(AppEvent.success);
}