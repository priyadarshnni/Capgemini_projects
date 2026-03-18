import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza',
  imports: [FormsModule, CommonModule],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent {
  pizzaName: string = '';
  quantity: number = 1;
  address: string = '';

  isOrderValid(): boolean {
    return this.pizzaName.trim().length > 0 && this.quantity > 0 && this.address.trim().length > 0;
  }
}
