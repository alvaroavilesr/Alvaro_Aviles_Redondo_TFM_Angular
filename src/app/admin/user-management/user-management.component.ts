import {Component, OnInit} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {UserManagementService} from './user-management.service';
import {NgForOf, NgIf} from '@angular/common';
import { CreateUserModel } from '../../shared/models/createUser.model';
import {ToastrService} from 'ngx-toastr';
import {Login} from '../../shared/models/login.model';

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
  protected readonly sessionStorage = sessionStorage;
  loginModel: Login = { username: '', password: '' };
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedRole: string = 'Any';
  searchTerm: string = '';
  newRole: string = 'User';
  selectedUser: any = null;
  isLoading: boolean = true;
  createUserModel: CreateUserModel = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'User'
  };
  updateUserPassModel: { adminPass: string; newPass: string; newPassConfirm: string } = {
    adminPass: '',
    newPass: '',
    newPassConfirm: ''
  };

  constructor(private readonly userManagementService: UserManagementService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.userManagementService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.filteredUsers = this.users;
        this.isLoading = false;
      },
      error: () => {
      this.isLoading = false;
    }
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
    if (!this.createUserModel.username || !this.createUserModel.firstname || !this.createUserModel.lastname ||
      !this.createUserModel.email || !this.createUserModel.password) {
      this.toastr.error('Por favor, rellena todos los campos.', 'Crear usuario');
    }else {
      this.userManagementService
        .createUser(this.createUserModel)
        .subscribe({
          next: () => {
            this.toastr.success('Usuario creado correctamente.', 'Crear usuario');
            this.closeCreateUserModal();
            this.ngOnInit();
          },
          error: (error) => {
            if (error.status === 400) {
              this.toastr.error('El formato del correo no es válido o el nombre de usuario está en uso.', 'Crear usuario');
            }
          }
        });
    }
  }

  closeCreateUserModal(){
    const modalElement = document.getElementById('createUserModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openUpdateUserModal(user: any) {
    this.selectedUser = { ...user };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('updateUserData'));
    modal.show();
  }

  updateUserData() {
    if (!this.selectedUser.userFirstName || !this.selectedUser.userLastName || !this.selectedUser.email) {
      this.toastr.error('Por favor, rellena todos los campos.', 'Modificar datos usuario');
    }else{
      this.userManagementService
        .updateUserData(this.selectedUser)
        .subscribe({
          next: () => {
            this.toastr.success('Datos actualizados correctamente.', 'Modificar datos usuario');
            this.closeUpdateUserModal();
            this.ngOnInit();
          },
          error: (error) => {
            if (error.status === 400) {
              this.toastr.error('El formato del correo no es válido.', 'Crear usuario');
            }
          }
        });
    }
  }

  closeUpdateUserModal(){
    const modalElement = document.getElementById('updateUserData');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openUpdateUserPassModal(user: any) {
    this.selectedUser = { ...user };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('updateUserPass'));
    modal.show();
  }

  closeUpdateUserPassModal(){
    const modalElement = document.getElementById('updateUserPass');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  updateUserPass() {
    this.loginModel.username = <string>sessionStorage.getItem('UserName');
    this.loginModel.password = this.updateUserPassModel.adminPass;
    this.userManagementService.login(this.loginModel).subscribe({
      next: () => {
        if (this.updateUserPassModel.newPassConfirm !== this.updateUserPassModel.newPass) {
          this.toastr.error('Las contraseñas no coinciden.', 'Modificar contraseña');
          return;
        }
        this.updatePass();
      },
      error: () => {
        if (this.updateUserPassModel.adminPass.trim() === '' || this.updateUserPassModel.newPass.trim() === '' || this.updateUserPassModel.newPassConfirm.trim() === '') {
          this.toastr.error('Por favor, completa todos los campos.', 'Modificar contraseña');
          return;
        }
        this.toastr.error('Revisa tus credenciales.', 'Modificar contraseña');
      }
    });
  }

  updatePass() {
    this.userManagementService
      .updateUserPassword(this.selectedUser, this.updateUserPassModel.newPass)
      .subscribe({
        next: () => {
          this.toastr.success('Contraseña actualizada correctamente.', 'Modificar contraseña');
          this.closeUpdateUserPassModal();
          this.ngOnInit();
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error inesperado', 'Modificar contraseña');
        }
      });
  }

  closeUpdateUserRoleModal(){
    const modalElement = document.getElementById('updateUserRole');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openUpdateUserRoleModal(user: any) {
    this.selectedUser = { ...user };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('updateUserRole'));
    modal.show();
  }

  updateUserRole() {
    this.userManagementService
      .updateUserRole(this.selectedUser, this.newRole)
      .subscribe({
        next: () => {
          this.toastr.success('Rol actualizado correctamente.', 'Modificar rol');
          this.closeUpdateUserRoleModal();
          this.ngOnInit();
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error inesperado.', 'Modificar rol');
        }
      });
  }

  closeDeleteUserModal(){
    const modalElement = document.getElementById('deleteUser');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  openDeleteUserModal(user: any) {
    this.selectedUser = { ...user };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('deleteUser'));
    modal.show();
  }

  deleteUser() {
    this.userManagementService
      .deleteUser(this.selectedUser)
      .subscribe({
        next: () => {
          this.toastr.success('Usuario eliminado correctamente', 'Eliminar usuario');
          this.closeDeleteUserModal();
          this.ngOnInit();
        },
        error: () => {
          this.toastr.error('Ha ocurrido un error inesperado.', 'Eliminar usuario');
        }
      });
  }
}
