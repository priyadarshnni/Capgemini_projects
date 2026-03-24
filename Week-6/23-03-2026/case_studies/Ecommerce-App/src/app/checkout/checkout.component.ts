import { Component } from '@angular/core';
import  { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  form = {
    name: '',
    email: '',
    address: '',
    payment: ''
  };

  submit(){
    alert('Order placed successfully!');
    console.log(this.form);
  }
}
