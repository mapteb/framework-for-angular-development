import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../product/product.model';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { User } from '../auth/user.model';
import { UserRole } from '../state-transitions-config/user-role.enum';
import { AppData } from '../state-transitions-config/app-data.model';
import { AppEventModel } from '../state-transitions-config/app-event.model';
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
    appDataStore.setUser(new User('admin', '', '', 'ADMIN'))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN: LOGINVIEW and loginId=admin WHEN: login event triggered THEN: final state is LOGINSUCCESS', () => {
    const appData = new AppData();
    appData.user = new User('admin', '', '', '');
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.login, AppState.LOGINVIEW, appData);
    expect(appDataStore.getCurrentState()).toBe(AppState.LOGINSUCCESS);
  });

  it('GIVEN: LOGINVIEW and loginId=erroruser WHEN login event triggered THEN: final state is LOGINERROR', () => {
    const appData = new AppData();
    appData.user = new User('erroruser', '', '', '');
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.login, AppState.LOGINVIEW, appData);
    expect(appDataStore.getCurrentState()).toBe(AppState.LOGINERROR);
  });

  it('GIVEN: LOGINSUCCESS WHEN: home event triggered THEN: final state is HOMESUCCESS', () => {
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

  it('GIVEN: HOMESUCCESS WHEN: admin event triggered THEN: final state is ADMINSUCCESS', () => {
    console.log(">> is homeview: ", appDataStore.getCurrentState());
    //@ts-ignore
    const appEventModel = component.doTransition(appDataStore, AppEvent.admin, appDataStore.getCurrentState());
    const finalState: AppState = appDataStore.getCurrentState();
    expect(appDataStore.getCurrentState()).toBe(AppState.ADMINSUCCESS);
  });
});
