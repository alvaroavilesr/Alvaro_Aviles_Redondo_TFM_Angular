import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponentComponent } from './help-component/help-component.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { CategoryManagementComponent } from './vendor/category-management/category-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RegisterComponent } from './register/register.component';
import { RoleGuardService } from './shared/services/role-guard.service';
import { Roles } from './shared/roles';
import { ProfileComponent } from './profile/profile.component';
import {ItemManagementComponent} from './vendor/item-management/item-management.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-home',
    component: UserHomeComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Roles.USER] }
  },
  { path: 'category-management',
    component: CategoryManagementComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Roles.VENDOR] }
  },
  { path: 'item-management',
    component: ItemManagementComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Roles.VENDOR] }
  },
  { path: 'user-management',
    component: UserManagementComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Roles.ADMIN] }
  },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuardService],
    data: { roles: [Roles.VENDOR, Roles.ADMIN, Roles.USER] }
  },
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: '**', redirectTo:'home' },
];
