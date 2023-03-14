import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppState } from "../../state-transitions-config/app-states.enum";
import { UserRole } from "src/app/state-transitions-config/user-role.enum";
import { Observable, of, ReplaySubject } from "rxjs";


/**
 * This function supports the following state transition:
 * 
 *   PRODUCTSVIEW  -> product  -> processProduct()  -> product_success  -> PRODUCTVIEW
 * 
 * Pre-fetches data for the view
 * 
 * TODO: need to ad a new transition for product error
 * 
 * @param appEventModel 
 * @param appDataStore 
 * @returns AppEventModel
 */
export function productProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        Observable<AppEvent> {
        console.log(">> processing product request");

        return appDataStore.loadProduct(appEventModel.appData?.product?.id!);
}