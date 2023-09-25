import { Observable } from 'rxjs';
import { adminProcess } from '../admin/admin.process';
import { loginProcess } from '../auth/login/login.process';
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
  LOGINVIEW        -> login    -> processLogin()    -> success    -> LOGINSUCCESS
  LOGINSUCCESS     -> home     -> processHome()     -> success    -> HOMESUCCESS
  HOMESUCCESS      -> products -> processProducts() -> success    -> PRODUCTSSUCCESS
  PRODUCTSSUCCESS  -> product  -> processProduct()  -> success    -> PRODUCTSUCCESS
  HOMESUCCESS      -> admin    -> processAdmin()    -> success    -> ADMINSUCCESS
  -----------------------------------------------------------------------------------
 *      
 * 
 * TODO: To support a bookmarked applicationn URL like /products a transition like below can be added
 * UNKNOWN      -> products -> processProducts() -> success   -> PRODUCTSSUCCESS   
*/

/** 
 * This const configures the process that should be triggered when a pre-event is raised.
 * the loginProcess, homeProcess, productsProcess, productProcess and adminProcess are imported functions.
 * These functions pre-fetch data. When these functions complete and return success the request will be forwarded to 
 * the path URL configured. Although this functionality could be accomplished in app-routing.module.ts
 * using resolve and data properties, this configuration in conjunction with the doTransition method in the
 * base.component.ts enables  some simplifications in creating unit test scripts
 * (See: test-state-transitions.spec.ts)
 */
export const EventToProcessConfig = {
    login: { roles: undefined, process: loginProcess, successPath: "/home", errorPath: "/login"  },
    home: { roles: ['USER', 'ADMIN'], process: homeProcess, successPath: "/home", errorPath: "/home" },
    products: { roles: ['USER', 'ADMIN'], process: productsProcess, successPath: "/products", errorPath: "/products" },
    product: { roles: ['USER', 'ADMIN'], process: productProcess, successPath: "/products/product", errorPath: "/product" },
    admin: { roles: ['ADMIN'], process: adminProcess, successPath: "/admin", errorPath: "/admin" }
} as {[id: string]: { roles: string[] | undefined; process: (appEventModel: AppEventModel, appDataStore: AppDataStoreService) => Observable<AppEvent>; successPath: string; errorPath: string }};
