import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../product/product.model';
import { ProductsService } from '../product/products.service';
import { AppEventModel } from './app-event.model';
import { AppState } from './app-states.enum';

/**
 * This service helps with state management for the application
 */
@Injectable({
  providedIn: 'root'
})
export class AppDataStoreService {

  protected productsStore = new BehaviorSubject<Product[]>([]);
  protected productsDetailsStore = new BehaviorSubject<Product[]>([]);
  protected productStore = new BehaviorSubject<Product>(new Product());
  protected currentState = new BehaviorSubject<AppState>(AppState.UNKNOWN);
  public currentState$ = this.currentState.asObservable();
  protected preTransitionData = new BehaviorSubject<AppEventModel>(new AppEventModel());
  public preTransitionData$ = this.preTransitionData.asObservable();

  constructor(protected productsService: ProductsService) { }

  // used to restore a previous view
  setPreTransitonData(preTransitionData: AppEventModel) {
    this.preTransitionData.next(preTransitionData);
  }

    // used to restore a previous view
  getPreTransitonData(): AppEventModel {
    return this.preTransitionData.value;
  }

  setCurrentState(appState: AppState) {
    this.currentState.next(appState);
  }

  getCurrentState(): AppState {
    return this.currentState.getValue();
  }

  public setProducts(products: Product[]) {
    this.productsStore.next(products);
  }

  getProducts(): Product[] {
    return this.productsStore.getValue();
  }

  setProduct(product: Product) {
    const productDetails: Product[] = this.productsDetailsStore.getValue();
    var index = productDetails.findIndex(pd => pd.id === product.id); 
    if (index === -1) {
      productDetails.push(product);
      this.productsDetailsStore.next(productDetails);
    }
  }

  getProduct(id: number): Product | undefined {
    return this.productsDetailsStore.getValue().find(pd => pd.id === id);
  }

  loadProducts() {
    this.productsService.getProducts().pipe(take(1)).subscribe(res => this.setProducts(res));
  }

  loadProduct(id: any) {
    this.productsService.getProduct(id).pipe(take(1)).subscribe(res => this.setProduct(res));
  }
}


