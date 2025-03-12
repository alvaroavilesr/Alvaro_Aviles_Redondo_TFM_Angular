import { Component } from '@angular/core';
import {Register} from '../shared/models/register.model';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerModel: Register = {
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    passwordRepeat: '',
  };

  constructor(private readonly toastr: ToastrService,
              private readonly router: Router,
              private readonly registerService: RegisterService) {}

  register(event: Event) {
    event.preventDefault();

    if (!this.isFormValid()) return;

    this.processRegistration();
  }

  private isFormValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!this.registerModel.username || !this.registerModel.email || !this.registerModel.name ||
      !this.registerModel.surname || !this.registerModel.password || !this.registerModel.passwordRepeat) {
      this.toastr.error('Por favor, completa todos los campos.', 'Registro');
      return false;
    }

    if (this.registerModel.password !== this.registerModel.passwordRepeat) {
      this.toastr.error('Las contraseñas no coinciden.', 'Registro');
      return false;
    }

    if (!emailPattern.test(this.registerModel.email)) {
      this.toastr.error('El formato del correo electrónico no es válido.', 'Registro');
      return false;
    }

    return true;
  }

  private processRegistration() {
    this.registerService.register(this.registerModel).subscribe({
      next: () => {
        this.toastr.success('Usuario registrado correctamente.', 'Registro');
        this.resetForm();
      },
      error: (error) => this.handleRegistrationError(error)
    });
  }

  private resetForm() {
    this.registerModel = {
      username: '',
      email: '',
      name: '',
      surname: '',
      password: '',
      passwordRepeat: '',
    };
  }

  private handleRegistrationError(error: any) {
    if (error.status === 400) {
      this.toastr.error('El nombre de usuario ya está en uso.', 'Registro');
    } else {
      this.toastr.error('Ha ocurrido un error inesperado.', 'Registro');
    }
  }
}
