import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../shared/models/login.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';


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
              private readonly loginService: LoginService,
              private router: Router,
              private authService: AuthService) {}

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
          if ( response.body.userResponse.role[0] == undefined) {
            this.toastr.error('Revisa tus credenciales.', 'Login');
          } else{
            let role = response.body.userResponse.role[0].roleName;
            sessionStorage.setItem('JWT', response.body.jwtToken);
            sessionStorage.setItem('UserName', response.body.userResponse.userName);
            sessionStorage.setItem('UserEmail', response.body.userResponse.email);
            sessionStorage.setItem('Role', response.body.userResponse.role[0].roleName);
            this.authService.checkLoginStatus();
            if (role === "User") {
              this.router.navigate(['/user-home']);
            } else if (role === "Vendor") {
              this.router.navigate(['/vendor-home']);
            } else {
              this.router.navigate(['/admin-home']);
            }
          }

        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error('Revisa tus credenciales.', 'Login');
          }else{
            this.toastr.error('Ha occurido un error inesperado.', 'Login');
          }
        }
    });
  }
}
