import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
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
        var result = new ReplaySubject<AppEvent>();
        if (appEventModel.appData?.product.id &&
                appEventModel.appData.product.id > 0) {
                appDataStore.loadProduct(appEventModel.appData.product.id).subscribe(product => {
                        appDataStore.setProduct(product);
                        result.next(AppEvent.success);
                });
        } else {
                // TODO: improve error handling
                result.next(AppEvent.unknown);
        }
        return result.asObservable();
}