import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, DatePipe, CustomCurrencyPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  today = new Date();

  data$ = of([
    {
      id: 1,
      productName:'Laptop',
      price:50000,
      status:'Delivered'
    },
    {
      id: 2,
      productName:'Mobile',
      price:20000,
      status:'Pending'
    },
  ]);;

  product ={
    name:'Laptop',
    price:50000,
  };
}