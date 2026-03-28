import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html'
})
export class Product {

  products = [
    { name: 'Laptop', price: 50000 },
    { name: 'Phone', price: 20000 },
    { name: 'Headphones', price: 2000 }
  ];

  constructor(private cartService: CartService) {}

  add(product: any) {
    this.cartService.addToCart(product);
  }
}