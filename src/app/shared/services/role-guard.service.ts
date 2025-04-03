import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Roles } from '../roles';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = sessionStorage.getItem('JWT');
    const userRole = sessionStorage.getItem('Role');
    const requiredRoles: Roles[] = route.data['roles'];

    if (!token) {
      this.router.navigate(['/home']);
      return false;
    }

    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(userRole as Roles)) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
