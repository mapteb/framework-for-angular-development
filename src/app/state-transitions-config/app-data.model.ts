import { Product } from '../product/product.model';

/**
 * When the Angular components delegate the events to the Smart Component
 * they can, optionally, include this data.
 * This class can optionally include a user proprty so the
 * Smart Component can check whether the user is authenticated
 * and authorized for a given transition
 * 
 */
export class AppData {
    products: Product[] = [];
    product: Product = new Product();
}

