import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { Observable, ReplaySubject } from "rxjs";

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
        Observable<AppEvent> {
        console.log(">> processing products request");
        var result = new ReplaySubject<AppEvent>();
        // TODO: implement loadProducts error handling
        appDataStore.loadProducts().subscribe(products => {
                appDataStore.setProducts(products);
                result.next(AppEvent.success);
        });
        return result.asObservable();
}