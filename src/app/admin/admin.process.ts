import { Observable, of } from "rxjs";
import { AppDataStoreService } from "src/app/state-transitions-config/app-data-store.service";
import { AppEventModel } from "src/app/state-transitions-config/app-event.model";
import { AppEvent } from "src/app/state-transitions-config/app-events.enum";
import { AppState } from "src/app/state-transitions-config/app-states.enum";


/**
 * This function supports the following state transitions:
 * 
 *  HOMEVIEW  -> admin  -> processAdmin()  -> success  -> ADMINVIEW
 * 
 * 
 *  * TODO: need to add a new transition for admin error
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns AppEventModel
 */
export function adminProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): Observable<AppEvent> {
    const user = appDataStore.getUser();
    console.log(">> processing admin request");
    // TODO: implement ADMIN functionality
    return of(AppEvent.success);
}