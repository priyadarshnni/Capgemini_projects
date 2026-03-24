import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ContactComponent } from './contact/contact.component';
export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'product', component:ProductComponent},
    {path:'contact', component:ContactComponent},
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'**', component:ErrorComponent}
];
