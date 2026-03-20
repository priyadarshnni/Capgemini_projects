import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderParent } from './order-parent/order-parent.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderParent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lifecycle-hook-demo';
}
