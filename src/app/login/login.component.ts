import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../shared/models/login.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginModel: Login = { username: '', password: '' };

  constructor(private toastr: ToastrService,
              private readonly loginService: LoginService) {}

  login(event: Event) {
    event.preventDefault();

    if (!this.loginModel.username || !this.loginModel.password) {
      this.toastr.error('Por favor, completa todos los campos.', 'Login');
      return;
    }
    this.loginService
      .login(this.loginModel)
      .subscribe({
        next: (response) => {
          console.log('Respuesta de la API:', response);
          console.log('Cuerpo de la respuesta:', response.body);
          console.log('Código de estado:', response.status);
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error('Revisa tus credenciales', 'Login');
          }else{
            this.toastr.error('Ha occurido un error inesperado', 'Login');
          }
        }
    });
  }
}
