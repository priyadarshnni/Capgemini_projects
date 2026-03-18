import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizzaComponent } from './pizza/pizza.component';

@Component({
  selector: 'app-root',
  imports: [PizzaComponent],
  template: '<app-pizza></app-pizza>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizza-app';
}
