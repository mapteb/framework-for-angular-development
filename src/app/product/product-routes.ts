import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

export const PRODUCT_ROUTES: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'product', component: ProductComponent },
  ];