import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppEvent } from '../../state-transitions-config/app-events.enum';
import { AppDataStoreService } from '../../state-transitions-config/app-data-store.service';
import { BaseComponent } from '../../base/base.component';
import { AppState } from '../../state-transitions-config/app-states.enum';
import { Product } from '../product.model';

/**
 * This Angular component loads the PRODUCT view.
 * It extends the BaseComponent so it can delegate handling the events raised
 * on the PRODUCT view. The BaseComponent, in turn, uses product.process.ts
 * to pre-fetch data for this ProductComponent 
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

  product: Product | undefined;

  constructor(protected override location: Location, protected override router: Router, 
    protected override appDataStore: AppDataStoreService) {
    super(location, router, appDataStore);
  }

  override ngOnInit(): void {
    console.log(">> Loading product: ");  
    this.product = this.appDataStore.getProduct(this.appEventModel.appData?.product.id!);
  }
  
  // a handler for the user raised event
  // delegates the event to the Smart Component
  // by specifying the event name and current view name
  handlePoductsEvent(path: string) {
    this.appEventModel = this.doTransition(this.appDataStore, AppEvent.products, AppState.PRODUCTVIEW);
  }
}
