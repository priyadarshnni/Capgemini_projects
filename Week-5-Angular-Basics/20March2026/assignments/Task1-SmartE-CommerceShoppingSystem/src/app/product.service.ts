import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 2999, category: 'Electronics', rating: 4.5, description: 'Premium noise-cancelling wireless headphones with 30hr battery.' },
    { id: 2, name: 'Smart Watch', price: 8999, category: 'Electronics', rating: 4.7, description: 'Fitness tracking smartwatch with heart rate monitor and GPS.' },
    { id: 3, name: 'Bluetooth Speaker', price: 1499, category: 'Electronics', rating: 4.3, description: 'Portable waterproof speaker with 360 degree surround sound.' },
    { id: 4, name: 'Laptop Stand', price: 899, category: 'Electronics', rating: 4.2, description: 'Adjustable aluminium laptop stand for ergonomic workspace.' },
    { id: 5, name: 'Running Shoes', price: 3499, category: 'Clothing', rating: 4.6, description: 'Lightweight breathable running shoes with memory foam sole.' },
    { id: 6, name: 'Casual T-Shirt', price: 599, category: 'Clothing', rating: 4.1, description: '100% organic cotton premium comfort t-shirt.' },
    { id: 7, name: 'Denim Jacket', price: 2299, category: 'Clothing', rating: 4.4, description: 'Classic denim jacket with modern slim fit design.' },
    { id: 8, name: 'Yoga Mat', price: 799, category: 'Clothing', rating: 4.0, description: 'Non-slip extra thick yoga mat with carrying strap.' },
    { id: 9, name: 'JavaScript: The Good Parts', price: 499, category: 'Books', rating: 4.8, description: 'Essential guide to best practices in JavaScript.' },
    { id: 10, name: 'Clean Code', price: 599, category: 'Books', rating: 4.9, description: 'A handbook of agile software craftsmanship by Robert Martin.' },
    { id: 11, name: 'Air Fryer', price: 4999, category: 'Home', rating: 4.5, description: 'Digital air fryer with 8 presets and non-stick basket.' },
    { id: 12, name: 'Coffee Maker', price: 3299, category: 'Home', rating: 4.6, description: 'Programmable drip coffee maker with thermal carafe.' },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getCategories(): string[] {
    return ['All', ...new Set(this.products.map(p => p.category))];
  }
}
