import { AppData } from "../../state-transitions-config/app-data.model";
import { AppEventModel } from "../../state-transitions-config/app-event.model";
import { AppEvent } from "../../state-transitions-config/app-events.enum";
import { AppState } from "../../state-transitions-config/app-states.enum";
import { AppDataStoreService } from "../../state-transitions-config/app-data-store.service";
import { UserRole } from "src/app/state-transitions-config/user-role.enum";
import { Observable, ReplaySubject } from "rxjs";

/**
 * This function pre-fetches data for the products page
 * 
 * @param appEventModel 
 * @param appDataStore
 * @returns Observable<AppEvent>
 */
export function productsProcess(appEventModel: AppEventModel, appDataStore: AppDataStoreService):
        Observable<AppEvent> {
        console.log(">> processing products request");
        return appDataStore.loadProducts();
}