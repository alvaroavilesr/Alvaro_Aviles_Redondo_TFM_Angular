import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {HelpComponentComponent} from './help-component/help-component.component';
import {AboutComponent} from './about/about.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponentComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: '**', redirectTo:'home' }
];
