import { AppDataStoreService } from "src/app/state-transitions-config/app-data-store.service";
import { AppEventModel } from "src/app/state-transitions-config/app-event.model";
import { AppEvent } from "src/app/state-transitions-config/app-events.enum";
import { AppState } from "src/app/state-transitions-config/app-states.enum";


/**
 * This function supports the following state transitions:
 * 
 *  LOGINVIEW  -> login  -> processLogin()  -> login_success  -> HOMEVIEW
 * 
 * 
 *  * TODO: need to add a new transition for login_error
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns AppEventModel
 */
export function loginProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService): AppEventModel {
    const user = appEventModel.appData.user;
    console.log(">> processing login request for user: ", user);
    if (user && user.loginId) {
        appDataStore.login(user.loginId);
        appEventModel.appEvent = AppEvent.login_success;
        appEventModel.appState = AppState.HOMEVIEW;
    } else {
        // TODO: implement login_error
        appEventModel.appEvent = AppEvent.unknown;
        appEventModel.appState = AppState.UNKNOWN;
    }
    return appEventModel;
}