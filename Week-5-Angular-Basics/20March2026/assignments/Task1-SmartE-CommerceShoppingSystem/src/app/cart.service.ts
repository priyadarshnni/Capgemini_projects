import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.model';
import { CartItem } from './cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  items = this._items.asReadonly();

  totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  isInCart(productId: number): boolean {
    return this._items().some(item => item.product.id === productId);
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this._items().find(i => i.product.id === product.id);
    if (existing) {
      this._items.set(
        this._items().map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      this._items.set([...this._items(), { product, quantity }]);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this._items.set(
      this._items().map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  removeFromCart(productId: number): void {
    this._items.set(this._items().filter(i => i.product.id !== productId));
  }

  clearCart(): void {
    this._items.set([]);
  }
}
