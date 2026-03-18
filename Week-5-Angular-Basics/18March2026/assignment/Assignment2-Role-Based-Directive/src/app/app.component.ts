import { Component } from '@angular/core';
import { RoleBasedDirective } from './role-based.directive';

@Component({
  selector: 'app-root',
  imports: [RoleBasedDirective],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  currentUserRole: string = 'user';

  toggleRole() {
    this.currentUserRole = this.currentUserRole === 'admin' ? 'user' : 'admin';
  }
}
