import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { Observable } from "rxjs";


/**
 * This function pre-fetches data for the product page
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns Observable<AppEvent>
 */
export function productProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        Observable<AppEvent> {
        console.log(">> processing product details request for id: ", appEventModel.appData?.product?.id);

        return appDataStore.loadProduct(appEventModel.appData?.product?.id);
}