import { Observable, of } from "rxjs";
import { AppDataStoreService } from "../state-transitions-config/app-data-store.service";
import { AppEventModel } from "../state-transitions-config/app-event.model";
import { AppEvent } from "../state-transitions-config/app-events.enum";


/**
 * This function pre-fetches data for the admin page
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns Observable<AppEvent>
 */
export function adminProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): Observable<AppEvent> {
    const user = appDataStore.getUser();
    console.log(">> processing admin request");
    // TODO: implement ADMIN functionality
    return of(AppEvent.success);
}