import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './profile.service';
import { Login } from '../shared/models/login.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  loginModel: Login = { username: '', password: '' };
  userData: any;
  fieldToEdit: string = '';
  newValue: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';

  constructor(private readonly toastr: ToastrService,
              private readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.userData = {
      username: sessionStorage.getItem('UserName'),
      email: sessionStorage.getItem('UserEmail'),
      name: sessionStorage.getItem('FirstName'),
      surname: sessionStorage.getItem('LastName')
    };
  }

  openModal(field: string): void {
    this.fieldToEdit = field;
    switch (field) {
      case 'UserEmail':
        this.newValue = this.userData.email;
        break;
      case 'FirstName':
        this.newValue = this.userData.name;
        break;
      case 'LastName':
        this.newValue = this.userData.surname;
        break;
      case 'Password':
        this.currentPassword = '';
        this.newPassword = '';
        this.repeatNewPassword = '';
        break;
      default:
        this.newValue = '';
    }
    const modal = new (window as any).bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  closeModal(): void {
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  saveChanges(): void {
    if (this.fieldToEdit === 'Password') {
      this.loginModel.username = this.userData.username;
      this.loginModel.password = this.currentPassword;

      this.profileService.login(this.loginModel).subscribe({
        next: () => {
          if (this.currentPassword.trim() === '' || this.newPassword.trim() === '' || this.repeatNewPassword.trim() === '') {
            this.toastr.error('Por favor, completa todos los campos.', 'Perfil');
            return;
          }
          if (this.newPassword !== this.repeatNewPassword) {
            this.toastr.error('Las contraseñas no coinciden.', 'Perfil');
            return;
          }
          this.newValue = this.newPassword;
          this.updateUserData();
        },
        error: () => {
          this.toastr.error('Revisa tus credenciales.', 'Perfil');
          return;
        }
      });
    } else {
      this.updateUserData();
    }
  }

  updateUserData(): void {
    this.profileService.updateUserData(this.fieldToEdit, this.newValue).subscribe({
      next: () => {
        this.toastr.success('Dato actualizado correctamente.', 'Perfil');
        if (this.fieldToEdit !== 'Password' && this.newValue.trim() !== '') {
          this.userData[this.fieldToEdit] = this.newValue;
          sessionStorage.setItem(this.fieldToEdit, this.newValue);
        }
        this.closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastr.error('Tu sesión ha expirado.', 'Perfil');
        } else {
          if (error.status === 400) {
            this.toastr.error('El formato del correo no es válido', 'Perfil');
          }else{
            this.toastr.error('Ha ocurrido un error inesperado.', 'Perfil');
          }
        }
      }
    });
  }

  getFieldLabel(field: string): string {
    const fieldLabels: { [key: string]: string } = {
      'UserEmail': 'correo electrónico',
      'FirstName': 'nombre',
      'LastName': 'apellido',
      'Password': 'contraseña'
    };
    return fieldLabels[field] || field;
  }
}
