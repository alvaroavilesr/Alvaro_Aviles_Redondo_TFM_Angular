import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {UserManagementService} from './user-management.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedRole: string = 'Cualquiera';

  constructor(private readonly userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.userManagementService.getUsers().subscribe((response) => {
      this.users = response;
      this.filteredUsers = this.users;
    });
  }

  filterUsersByRole(role: string) {
    this.selectedRole = role;
    if (role === 'Any') {
      this.filteredUsers = this.users;
    } else {
      console.log(role)
      this.filteredUsers = this.users.filter(user => user.role[0].roleName === role);
    }
  }

  modifyData(user: any) {
    console.log('Modificar datos de:', user);
  }

  modifyPassword(user: any) {
    console.log('Modificar contraseña de:', user);
  }

  changeRole(user: any) {
    console.log('Cambiar rol de:', user);
  }

  deleteUser(user: any) {
    console.log('Eliminar usuario:', user);
  }

  protected readonly sessionStorage = sessionStorage;
}
