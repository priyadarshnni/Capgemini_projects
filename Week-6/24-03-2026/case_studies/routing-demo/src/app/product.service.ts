import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  getProducts(): Product[] {
    return [
      new Product(1, 'Laptop', 1500),
      new Product(2, 'Smartphone', 800),
      new Product(3, 'Tablet', 600)
    ];
  }
  getProductById(id: number): Product | undefined {
    return this.getProducts().find(p => p.productId === id);
  }

}
