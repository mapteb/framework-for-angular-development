import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppState } from "../../state-transitions-config/app-states.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";

/**
 * This function supports the following state transitions
 * 
 * HOMEVIEW      -> products -> processProducts() -> products_success -> PRODUCTSVIEW
 * PRODUCTVIEW   -> products -> processProducts() -> products_success -> PRODUCTSVIEW
 * 
 * Pre-fetches data for the view.
 * 
 * TODO: Need to add new transitions for error events like products error
 * 
*/
export function productsProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        AppEventModel {
        console.log(">> processing products request");

        appDataStore.loadProducts();
        appEventModel.appEvent = AppEvent.success;
        appEventModel.appState = AppState.PRODUCTSVIEW;

        return appEventModel;
}