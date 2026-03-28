import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any[] = [];

  addToCart(product: any) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  clearCart() {
    this.items = [];
  }
}