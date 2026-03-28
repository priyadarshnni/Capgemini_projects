import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class Cart {

  items: any[] = [];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  remove(i: number) {
    this.cartService.removeItem(i);
  }

  clear() {
    this.cartService.clearCart();
    this.items = [];
  }
}