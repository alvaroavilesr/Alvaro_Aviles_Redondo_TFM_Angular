import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {UserManagementService} from './user-management.service';
import {NgForOf, NgIf} from '@angular/common';
import { CreateUserModel } from '../../shared/models/createUser.model';
import {ToastrService} from 'ngx-toastr';

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
  selectedRole: string = 'Any';
  searchTerm: string = '';
  createUserModel: CreateUserModel = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'User'
  };

  constructor(private readonly userManagementService: UserManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.userManagementService.getUsers().subscribe((response) => {
      this.users = response;
      this.filteredUsers = this.users;
    });
  }

  filterUsersByRole(role: string) {
    this.selectedRole = role;
    this.searchTerm = '';
    this.applyFilters();
  }

  searchUsers() {
    this.selectedRole = 'Any';
    this.applyFilters();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesRole = this.selectedRole === 'Any' || user.role[0]?.roleName === this.selectedRole;
      const matchesSearch = user.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }

  openCreateUserModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('createUserModal'));
    modal.show();
  }

  createUser() {
    this.userManagementService
      .createUser(this.createUserModel)
      .subscribe({
        next: () => {
          this.toastr.success('Usuario creado correctamente.', 'Crear usuario');
          this.closeCreateUserModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          console.log(error.status);
          if (error.status === 400) {
            this.toastr.error('El formato del correo no es válido o el nombre de usuario está en uso.', 'Crear usuario');
          }
        }
      });
  }

  closeCreateUserModal(){
    const modalElement = document.getElementById('createUserModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
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
