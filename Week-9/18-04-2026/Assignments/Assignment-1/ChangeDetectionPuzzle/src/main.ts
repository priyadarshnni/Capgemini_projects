import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
