import { AppEventModel } from "../state-transitions-config/app-event.model";
import { AppEvent } from "../state-transitions-config/app-events.enum";
import { AppState } from "../state-transitions-config/app-states.enum";
import { AppDataStoreService } from "../state-transitions-config/app-data-store.service";
import { UserRole } from "../state-transitions-config/user-role.enum";

/**
 * This function supports the following state transitions:
 * 
 *  UNKNOWN       -> home     -> processHome()     -> home_success     -> HOMEVIEW
 *  PRODUCTSVIEW  -> home     -> processHome()     -> home_success     -> HOMEVIEW
 *  PRODUCTVIEW   -> home     -> processHome()     -> home_success     -> HOMEVIEW
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

    appEventModel.appEvent = AppEvent.home_success;
    appEventModel.appState = AppState.HOMEVIEW;

    return appEventModel;
}