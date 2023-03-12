import { Observable } from 'rxjs';
import { homeProcess } from '../home/home.process';
import { productProcess } from '../product/product/product.process';
import { productsProcess } from '../product/products/products.process';
import { AppDataStoreService } from './app-data-store.service';
import { AppEventModel } from './app-event.model';
import { AppEvent } from './app-events.enum';
import { AppState } from './app-states.enum';

/**
 * The following state transitions correspond to the SPA that we need to develop.
 * The five columns are: Initial State, pre-event, process, post-event and final state
 * State Transitions corresponding to eror events like products_error are not considered
 * here but can be easily added as aditional transitions
 * 
  -----------------------------------------------------------------------------------
  UNKNOWN       -> home     -> processHome()     -> success    -> HOMEVIEW
  HOMEVIEW      -> products -> processProducts() -> success    -> PRODUCTSVIEW
  PRODUCTSVIEW  -> product  -> processProduct()  -> success    -> PRODUCTVIEW
  HOMEVIEW      -> admin    -> processAdmin()    -> success    -> ADMINVIEW
  -----------------------------------------------------------------------------------
 *      
 * 
 * TODO: To support a bookmarked applicationn URL like /products a transition like below can be added
 * UNKNOWN      -> products -> processProducts() -> success   -> PRODUCTSVIEW   
*/

/** 
 * This const configures the process that should be triggered when a pre-event is raised.
 * the homeProcess, productsProcess, and productProcess are imported functions.
 * When the process returns success the end state is appState. The path property
 * specifies the url fo the view which loads the data pre-fetched by the process.
 * Although this functionality
 * could be accomplished in app-routing.module.ts
 * using resolve and data properties, this configuration in conjunction with the doTransition method in the
 * base.component.ts enables  some simplifications in creating unit test scripts
 * (See: test-state-transitions.spec.ts)
 */
export const EventToProcessConfig = {
    home: { process: homeProcess, appState: AppState.HOMEVIEW, path: "/home" },
    products: { process: productsProcess, appState: AppState.PRODUCTSVIEW, path: "/products" },
    product: { process: productProcess, appState: AppState.PRODUCTVIEW, path: "/products/product" },
} as {[id: string]: { process: (appEventModel: AppEventModel, appDataStore: AppDataStoreService) => Observable<AppEvent>; appState: AppState; path: string; }};
