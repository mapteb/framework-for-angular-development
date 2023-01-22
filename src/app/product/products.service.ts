import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Product } from './product.model';

/**
 * This service typically calls external REST services to get the data
 * Here we use hard-coded data for demo purposes
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsCount: number = 0;

  constructor() { }

  // Returns hard-coded data for demo purposes
  public getProducts(): Observable<Product[]> {
    //TODO: call a REST service to get the products
    return of([new Product(1, "product_1", 11.11), new Product(2, "product_2", 22.22)]);
  }

  // Returns hard-coded data for demo purposes
  public getProduct(id: any): Observable<Product> {
    //TODO: call a REST service to get the product
    return of(new Product(id, "product_" + id, 11.11*id));
  }
}
