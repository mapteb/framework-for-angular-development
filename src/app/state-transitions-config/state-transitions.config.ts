import { homeProcess } from '../home/home.process';
import { productProcess } from '../product/product/product.process';
import { productsProcess } from '../product/products/products.process';

/**
 * The following state transitions correspond to the SPA that we need to develop.
 * The five columns are: Initial State, pre-event, process, post-event and final state
 * 
  -----------------------------------------------------------------------------------
  UNKNOWN       -> home     -> processHome()     -> success    -> HOMEVIEW
  HOMEVIEW      -> products -> processProducts() -> success    -> PRODUCTSVIEW
  PRODUCTSVIEW  -> product  -> processProduct()  -> success    -> PRODUCTVIEW
  -----------------------------------------------------------------------------------
 *      
 * 
 * TODO: To support a bookmarked applicationn URL like /products a transition like below can be added
 * UNKNOWN      -> products  -> processProducts()   ->  success  -> PRODUCTSVIEW   
*/

/** 
 * This const configures the process that should be triggered when a pre-event is raised.
 * the homeProcess, productsProcess, and productProcess are imported functions.
 * These functions pre-fetch data and implement any business rules needed for the corresponding views.
 * When these functions complete and return the request will be forwarded to 
 * the path URL configured. Although this functionality could be accomplished in app-routing.module.ts
 * using resolve and data properties, this configuration in conjunction with the doTransition method in the
 * base.component.ts enables  some simplifications in creating unit test scripts
 * (See: test-state-transitions.spec.ts)
 */
export const EventToProcessConfig = {
    home: { process: homeProcess, path: "/home" },
    products: { process: productsProcess, path: "/products" },
    product: { process: productProcess, path: "/products/product" }
} as { [id: string]: any }

