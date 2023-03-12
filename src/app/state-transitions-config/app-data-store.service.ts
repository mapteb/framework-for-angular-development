import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
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

  protected productsStore = new BehaviorSubject<Product[]>([]);
  protected productsDetailsStore = new BehaviorSubject<Product[]>([]);
  protected productStore = new BehaviorSubject<Product>(new Product());
  protected userStore = new BehaviorSubject<User>(new User('', '', '', ''));
  public user$ = this.userStore.asObservable();
  protected currentState = new BehaviorSubject<AppState>(AppState.UNKNOWN);
  public currentState$ = this.currentState.asObservable();
  protected preTransitionData = new BehaviorSubject<AppEventModel>(new AppEventModel());
  public preTransitionData$ = this.preTransitionData.asObservable();

  constructor(protected productsService: ProductsService, protected authService: AuthService,) { }

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

  setUser(user: User) {
    this.userStore.next(user);
  }

  getUser(): User {
    return this.userStore.getValue();
  }

  loadProducts(): Observable<Product[]> {
    return this.productsService.getProducts();
  }

  loadProduct(id: number): Observable<Product> {
    return this.productsService.getProduct(id);
  }

  login(loginId: string): Observable<User> {
    return this.authService.login(loginId);
  }
}


