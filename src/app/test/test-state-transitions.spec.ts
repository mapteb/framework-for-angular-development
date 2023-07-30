import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../product/product.model';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AppData } from '../state-transitions-config/app-data.model';
import { AppEvent } from '../state-transitions-config/app-events.enum';
import { AppDataStoreService } from '../state-transitions-config/app-data-store.service';
import { ProductsService } from '../product/products.service';
import { AppState } from '../state-transitions-config/app-states.enum';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../product/products/products.component';
import { ProductComponent } from '../product/product/product.component';

describe('Unit test each state transition:', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let router: Router;
  let appDataStore: AppDataStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'home', component: HomeComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'products/product', component: ProductComponent }
      ])],
      declarations: [ BaseComponent ],
      providers: [ProductsService, AppDataStoreService]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    appDataStore = TestBed.inject(AppDataStoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN: UNKNOWN WHEN: home event triggered THEN: final state is HOMESUCCESS', () => {
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.home, AppState.LOGINSUCCESS);
    expect(appDataStore.getCurrentState()).toBe(AppState.HOMESUCCESS);
  });

  it('GIVEN: HOMESUCCESS WHEN: products event triggered THEN: final state is PRODUCTSSUCCESS', () => {
    console.log(">> is homeview: ", appDataStore.getCurrentState());
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.products, AppState.HOMESUCCESS);
    // const finalState: AppState = appDataStore.getCurrentState();
    expect(appDataStore.getCurrentState()).toBe(AppState.PRODUCTSSUCCESS);
  });

  it('GIVEN: PRODUCTSSUCCESS WHEN: product event triggered THEN: final state is PRODUCTSUCCESS', () => {
    console.log(">> is productsview: ", appDataStore.getCurrentState());
    const appData = new AppData();
    const product = new Product(1);
    appData.product = product;

    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.product, AppState.PRODUCTSSUCCESS, appData);
    // const finalState: AppState = appDataStore.getCurrentState();
    expect(appDataStore.getCurrentState()).toBe(AppState.PRODUCTSUCCESS);
  });
});
