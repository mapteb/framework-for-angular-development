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

describe('Unit test each state transition:', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let router: Router;
  let appDataStore: AppDataStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
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

  it('GIVEN: UNKNOWN state WHEN: home event triggered THEN: final state is HOMEVIEW', () => {
    const appData = new AppData();
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.home, AppState.UNKNOWN, appData);
    expect(appEventModel.appState).toBe(AppState.HOMEVIEW);
  });

  it('GIVEN: HOMEVIEW WHEN: products event triggered THEN: final state is PRODUCTSVIEW', () => {
    console.log(">> is homeview: ", appDataStore.getCurrentState());
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.products, AppState.HOMEVIEW);
    expect(appEventModel.appState).toBe(AppState.PRODUCTSVIEW);
  });

  it('GIVEN: PRODUCTSVIEW WHEN: product event triggered THEN: final state is PRODUCTVIEW', () => {
    const appData = new AppData();
    const product = new Product(1);
    appData.product = product;

    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.product, AppState.PRODUCTSVIEW, appData);
    expect(appEventModel.appState).toBe(AppState.PRODUCTVIEW);
  });
});
