import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce App';

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public cartService: CartService
  ) {
    this.products = this.productService.getProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }
}
