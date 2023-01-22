import { adminProcess } from '../admin/admin.process';
import { loginProcess } from '../auth/login/login.process';
import { homeProcess } from '../home/home.process';
import { productProcess } from '../product/product/product.process';
import { productsProcess } from '../product/products/products.process';
import { AppEvent } from './app-events.enum';
import { AppState } from './app-states.enum';

/**
 * The following state transitions correspond to the SPA tht we need to develop
 * The five columns are: Initial State, pre-event, process, post-event and final state
 * State Transitions corresponding to eror events like products_error are not considered
 * here but can be easily added as aditional transitions
 * 

  --
  LOGINVIEW     -> login    -> processLogin()    -> login_success    -> HOMEVIEW
  HOMEVIEW      -> products -> processProducts() -> products_success -> PRODUCTSVIEW
  PRODUCTSVIEW  -> product  -> processProduct()  -> product_success  -> PRODUCTVIEW
  HOMEVIEW      -> admin    -> processAdmin()    -> admin_success    -> ADMINVIEW
  --
 *      
 * 
 * TODO: To support a bookmarked applicationn URL like /products a transition like below can be added
 * UNKNOWN      -> products  -> processProducts()   -> products_success  -> PRODUCTSVIEW   
*/

/** 
 * This const configures the process that should be triggered when a pre-event is raised.
 * the homeProcess, productsProcess and productProcess are imported functions.
 * These functions pre-fetch data 
 */

interface IEventProcessDictionary<TValue> {
    [state_event: string]: TValue;
}

export const EventToProcessConfig = {
    login: { process: loginProcess, path: "/home"  },
    home: { roles: ['USER', 'ADMIN'], process: homeProcess, path: "/home" },
    products: { roles: ['USER', 'ADMIN'], process: productsProcess, path: "/products" },
    product: { roles: ['USER', 'ADMIN'], process: productProcess, path: "/products/product" },
    admin: { roles: ['ADMIN'], process: adminProcess, path: "/admin" }
} as {[id: string]: any}

