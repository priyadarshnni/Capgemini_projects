import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Angular Product Inventory Application';

  // Dropdown categories
  categories: string[] = ['Electronics', 'Accessories', 'Furniture'];

  // Selected category from dropdown
  selectedCategory: string = '';

  // Checkbox value
  showInStockOnly: boolean = false;

  // Original product list
  products: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 850.50, stock: 10 },
    { id: 2, name: 'Headphones', category: 'Accessories', price: 120.00, stock: 0 },
    { id: 3, name: 'Desk Chair', category: 'Furniture', price: 210.75, stock: 5 },
    { id: 4, name: 'Smartphone', category: 'Electronics', price: 650.99, stock: 8 },
    { id: 5, name: 'Mouse', category: 'Accessories', price: 25.50, stock: 15 },
    { id: 6, name: 'Bookshelf', category: 'Furniture', price: 150.00, stock: 0 },
    { id: 7, name: 'Monitor', category: 'Electronics', price: 300.00, stock: 7 }
  ];

  // This list is shown in table
  displayedProducts: Product[] = [];

  constructor() {
    this.getProducts();
  }

  // Show all products initially
  getProducts(): void {
    this.displayedProducts = [...this.products];
    this.applyStockFilter();
  }

  // Filter by selected category
  filterProducts(): void {
    if (this.selectedCategory) {
      this.displayedProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    } else {
      // If no category selected, no filtering should occur
      this.displayedProducts = [...this.products];
    }

    this.applyStockFilter();
  }

  // Sort by price ascending
  sortByPrice(): void {
    this.displayedProducts = [...this.displayedProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  // Checkbox toggle logic
  onStockToggle(): void {
    this.filterProducts();
  }

  // Apply stock filter after category filtering / initial load
  applyStockFilter(): void {
    if (this.showInStockOnly) {
      this.displayedProducts = this.displayedProducts.filter(
        product => product.stock > 0
      );
    }
  }
}