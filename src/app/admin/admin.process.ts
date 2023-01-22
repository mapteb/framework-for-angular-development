import { AppDataStoreService } from "src/app/state-transitions-config/app-data-store.service";
import { AppEventModel } from "src/app/state-transitions-config/app-event.model";
import { AppEvent } from "src/app/state-transitions-config/app-events.enum";
import { AppState } from "src/app/state-transitions-config/app-states.enum";


/**
 * This function supports the following state transitions:
 * 
 *  HOMEVIEW  -> admin  -> processAdmin()  -> admin_success  -> ADMINVIEW
 * 
 * 
 *  * TODO: need to add a new transition for admin_error
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns AppEventModel
 */
export function adminProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): AppEventModel {
    const user = appDataStore.getUser();
    console.log(">> processing login request for user: ", user);

    appEventModel.appEvent = AppEvent.admin_success;
    appEventModel.appState = AppState.ADMINVIEW;

    return appEventModel;
}