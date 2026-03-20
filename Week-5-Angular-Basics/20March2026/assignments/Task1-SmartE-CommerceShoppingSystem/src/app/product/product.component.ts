import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  searchQuery = signal('');
  selectedCategory = signal('All');
  quantities: Record<number, number> = {};
  notification = signal('');
  categories: string[] = [];

  private allProducts: Product[] = [];

  filteredProducts = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();
    return this.allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCat = cat === 'All' || p.category === cat;
      return matchesSearch && matchesCat;
    });
  });

  constructor(private productService: ProductService, public cartService: CartService) {}

  ngOnInit(): void {
    this.allProducts = this.productService.getProducts();
    this.categories = this.productService.getCategories();
    this.allProducts.forEach(p => this.quantities[p.id] = 1);
  }

  getQuantity(productId: number): number {
    return this.quantities[productId] ?? 1;
  }

  incrementQty(productId: number): void {
    this.quantities[productId] = (this.quantities[productId] ?? 1) + 1;
  }

  decrementQty(productId: number): void {
    if ((this.quantities[productId] ?? 1) > 1) {
      this.quantities[productId]--;
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.quantities[product.id] ?? 1);
    this.notification.set(`"${product.name}" added to cart.`);
    setTimeout(() => this.notification.set(''), 2500);
  }
}
