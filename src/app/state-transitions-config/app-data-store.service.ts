import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Product } from '../product/product.model';
import { ProductsService } from '../product/products.service';
import { AppEventModel } from './app-event.model';
import { AppEvent } from './app-events.enum';
import { AppState } from './app-states.enum';

/**
 * This service helps with state management for the application
 */
@Injectable({
  providedIn: 'root'
})
export class AppDataStoreService {

  protected productsStore = new BehaviorSubject<Product[]|null>(null);
  protected productsDetailsStore = new BehaviorSubject<Product[]>([]);
  protected productStore = new BehaviorSubject<Product|null>(null);
  protected currentState = new BehaviorSubject<AppState>(AppState.UNKNOWN);
  public currentState$ = this.currentState.asObservable();
  protected preTransitionData = new BehaviorSubject<AppEventModel>(new AppEventModel());
  public preTransitionData$ = this.preTransitionData.asObservable();

  protected message = new BehaviorSubject<string>('');
  public message$ = this.message.asObservable();

  constructor(protected productsService: ProductsService) { }

  setMessage(message: string): void {
    this.message.next(message);
  }

  getMessage(): string {
    return this.message.getValue();
  }

  // used to restore a previous view
  setPreTransitonData(preTransitionData: AppEventModel) {
    this.preTransitionData.next(preTransitionData);
  }

    // used to restore a previous view
  getPreTransitonData(): AppEventModel {
    return this.preTransitionData.getValue();
  }

  setCurrentState(appState: AppState) {
    this.currentState.next(appState);
  }

  getCurrentState(): AppState {
    return this.currentState.getValue();
  }

  public setProducts(products: Product[] | null) {
    this.productsStore.next(products);
  }

  getProducts(): Product[] | null {
    return this.productsStore.getValue();
  }

  setProduct(product: Product | null) {
    const productDetails = this.productsDetailsStore.getValue();
    var index = productDetails.findIndex(pd => pd.id === product?.id);
    if ((!index || index === -1) && product) {
      console.log(">> saving product: ", product);
      productDetails.push(product);
      this.productsDetailsStore.next(productDetails);
    }
  }

  getProduct(id: number): Product | null | undefined {
    const product = this.productsDetailsStore.getValue()?.find(pd => pd.id === id);
    console.log(">> product details: ", product);
    return product;
  }

  // TODO: needs error handling
  loadProducts(): Observable<AppEvent> {
    var result = new ReplaySubject<AppEvent>();
    this.productsService.getProducts().subscribe(products => {
      this.setProducts(products);
      result.next(AppEvent.success);});
    return result;
  }

  // TODO: needs error handling
  loadProduct(id: number | null | undefined): Observable<AppEvent> {
    console.log(">> product id")
    var result = new ReplaySubject<AppEvent>();
    this.productsService.getProduct(id).subscribe(product => {
      this.setProduct(product);
      result.next(AppEvent.success);});
    return result;
  }
}


