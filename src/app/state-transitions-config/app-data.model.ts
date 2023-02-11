import { Product } from '../product/product.model';

/**
 * TODO: include a user: User property when the application is
 * protected with authentication nd authorizations. 
 * 
 */
export class AppData {
    products: Product[] = [];
    product: Product = new Product();
}

