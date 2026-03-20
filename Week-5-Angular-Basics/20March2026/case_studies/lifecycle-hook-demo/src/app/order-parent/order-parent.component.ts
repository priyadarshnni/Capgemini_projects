
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderChildComponent } from '../order-child/order-child.component';

@Component({
  selector: 'app-order-parent',
  standalone: true,
  imports: [CommonModule, OrderChildComponent],
  templateUrl: './order-parent.html',
  styleUrl: './order-parent.css',
})
export class OrderParent {
  order = {
    id: 1,
    productName: 'Laptop',
    status: 'Pending',
    price: 50000,
  };

  updateStatus() {
    this.order={
      ...this.order,
      status:this.order.status === 'Pending' ? 'Delivered' : 'Pending'
    }
  }

  destroyChild = true;

  toggleChild() {
    this.destroyChild = !this.destroyChild;
  }

}