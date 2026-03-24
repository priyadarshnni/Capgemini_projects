import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
  <h1>Angular Routing Demo</h1>

  <nav>
    <a routerLink="/home">Home</a>
    <a routerLink="/product">Products</a>
    <a routerLink="/contact">Contact</a>
  </nav>
  <hr>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'routing-demo';
}
