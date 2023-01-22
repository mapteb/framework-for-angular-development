import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
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
    this.productStore.next(product);
  }

  getProduct(id: number): Product {
    return this.productStore.getValue();
  }

  setUser(user: User) {
    this.userStore.next(user);
  }

  getUser(): User {
    return this.userStore.getValue();
  }

  loadProducts() {
    this.productsService.getProducts().pipe(take(1)).subscribe(res => this.setProducts(res));
  }

  loadProduct(id: any) {
    this.productsService.getProduct(id).pipe(take(1)).subscribe(res => this.setProduct(res));
  }

  login(loginId: string) {
    this.authService.login(loginId).pipe(take(1)).subscribe(res => {
      this.setUser(res);
    });
  }
}


