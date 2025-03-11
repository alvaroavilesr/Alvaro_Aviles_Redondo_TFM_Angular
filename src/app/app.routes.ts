import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponentComponent } from './help-component/help-component.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { VendorHomeComponent } from './vendor/vendor-home/vendor-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'vendor-home', component: VendorHomeComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: '**', redirectTo:'home' },
];
