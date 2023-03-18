import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
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

  protected productsStore = new BehaviorSubject<Product[]|null>(null);
  protected productsDetailsStore = new BehaviorSubject<Product[]>([]);
  protected productStore = new BehaviorSubject<Product|null>(null);
  protected userStore = new BehaviorSubject<User|null>(null);
  public user$ = this.userStore.asObservable();
  protected currentState = new BehaviorSubject<AppState>(AppState.UNKNOWN);
  public currentState$ = this.currentState.asObservable();
  protected preTransitionData = new BehaviorSubject<AppEventModel>(new AppEventModel());
  public preTransitionData$ = this.preTransitionData.asObservable();

  protected message = new BehaviorSubject<string>('');
  public message$ = this.message.asObservable();

  constructor(protected productsService: ProductsService, protected authService: AuthService) { }

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

  setUser(user: User | null) {
    this.userStore.next(user);
  }

  getUser(): User | null {
    return this.userStore.getValue();
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

  // TODO: needs error handling
  login(loginId?: string): Observable<AppEvent> {
    var result = new ReplaySubject<AppEvent>();
    this.setMessage('');
    this.authService.login(loginId).subscribe({
      next: (user) => {
        console.log('Login success');
        this.setUser(user);
        result.next(AppEvent.success);
      },
      error: (err) => {
        console.log('Storing error message');
        this.setMessage('Login Error: ' + err);
        this.setUser(null);
        result.next(AppEvent.error);}
    });
    return result;
  }
}


