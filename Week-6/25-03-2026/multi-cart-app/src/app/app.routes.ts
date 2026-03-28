import { Routes } from '@angular/router';
import { Product } from './components/product/product';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  { path: '', component: Product },
  { path: 'cart', component: Cart }
];