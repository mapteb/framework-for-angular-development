import { AppEventModel } from "../state-transitions-config/app-event.model";
import { AppEvent } from "../state-transitions-config/app-events.enum";
import { AppState } from "../state-transitions-config/app-states.enum";
import { AppDataStoreService } from "../state-transitions-config/app-data-store.service";

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
export function homeProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): AppEventModel {
    console.log(">> processing home request");

    appEventModel.appEvent = AppEvent.success;
    appEventModel.appState = AppState.HOMEVIEW;

    return appEventModel;
}