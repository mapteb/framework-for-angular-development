import { AppEventModel } from "../state-transitions-config/app-event.model";
import { AppEvent } from "../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../state-transitions-config/app-data-store.service";
import { Observable, of, Subject } from "rxjs";

/**
 * This function pre-fetches data for the home page
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns Observable<AppEvent>
 */
export function homeProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): Observable<AppEvent> {
    console.log(">> processing home request");
    return of(AppEvent.success);
}