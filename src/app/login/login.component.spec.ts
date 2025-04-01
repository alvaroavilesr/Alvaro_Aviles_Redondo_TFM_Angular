import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('LoginComponent tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let loginService: jasmine.SpyObj<LoginService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    const loginSpy = jasmine.createSpyObj('LoginService', ['login']);
    const authSpy = jasmine.createSpyObj('AuthService', ['checkLoginStatus', 'checkRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, LoginComponent],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: LoginService, useValue: loginSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('LOGIN - should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('LOGIN - should show error if fields are empty', () => {
    component.loginModel.username = '';
    component.loginModel.password = '';
    component.login(new Event('submit'));

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, completa todos los campos.', 'Login');
  });

  it('LOGIN - should call loginService and handle successful login for User', () => {
    const mockResponse = {
      body: {
        jwtToken: 'fake-token',
        userResponse: {
          userName: 'testUser',
          email: 'test@example.com',
          role: [{ roleName: 'User' }]
        }
      }
    };

    const mockEvent = {
      preventDefault: jasmine.createSpy('preventDefault')
    } as unknown as Event;

    loginService.login.and.returnValue(of(mockResponse));
    component.loginModel = { username: 'testUser', password: 'password' };
    component.login(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(sessionStorage.getItem('JWT')).toBe('fake-token');
    expect(sessionStorage.getItem('UserName')).toBe('testUser');
    expect(sessionStorage.getItem('UserEmail')).toBe('test@example.com');
    expect(sessionStorage.getItem('Role')).toBe('User');
    expect(authService.checkLoginStatus).toHaveBeenCalled();
    expect(authService.checkRole).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/user-home']);
  });

  it('LOGIN - should call loginService and handle successful login for Vendor', () => {
    const mockResponse = {
      body: {
        jwtToken: 'fake-token',
        userResponse: {
          userName: 'vendorUser',
          email: 'vendor@example.com',
          role: [{ roleName: 'Vendor' }]
        }
      }
    };

    loginService.login.and.returnValue(of(mockResponse));
    component.loginModel = { username: 'vendorUser', password: 'password' };
    component.login(new Event('submit'));

    expect(sessionStorage.getItem('Role')).toBe('Vendor');
    expect(router.navigate).toHaveBeenCalledWith(['/vendor-home']);
  });

  it('LOGIN - should handle login failure due to invalid credentials', () => {
    loginService.login.and.returnValue(throwError(() => ({ status: 401 })));

    component.loginModel = { username: 'wrongUser', password: 'wrongPassword' };
    component.login(new Event('submit'));

    expect(toastrService.error).toHaveBeenCalledWith('Revisa tus credenciales.', 'Login');
  });

  it('LOGIN - should handle unexpected errors', () => {
    loginService.login.and.returnValue(throwError(() => ({ status: 500 })));

    component.loginModel = { username: 'errorUser', password: 'password' };
    component.login(new Event('submit'));

    expect(toastrService.error).toHaveBeenCalledWith('Ha occurido un error inesperado.', 'Login');
  });

  it('LOGIN - should show error when user role is undefined', () => {
    sessionStorage.clear();
    const mockResponse = {
      body: {
        jwtToken: 'fake-token',
        userResponse: {
          userName: 'testuser',
          email: 'test@example.com',
          role: [undefined]
        }
      }
    };

    loginService.login.and.returnValue(of(mockResponse));
    component.loginModel = { username: 'testuser', password: 'password' };
    component.login(new Event('submit'));

    expect(toastrService.error).toHaveBeenCalledWith('Revisa tus credenciales.', 'Login');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(sessionStorage.getItem('JWT')).toBeFalsy();
    sessionStorage.clear();
  });

  it('LOGIN - should navigate to admin home when role is Admin', () => {
    sessionStorage.clear();
    const mockResponse = {
      body: {
        jwtToken: 'admin-token',
        userResponse: {
          userName: 'admin',
          email: 'admin@example.com',
          role: [{ roleName: 'Admin' }]
        }
      }
    };

    loginService.login.and.returnValue(of(mockResponse));
    component.loginModel = { username: 'admin', password: 'adminpass' };
    component.login(new Event('submit'));

    expect(sessionStorage.getItem('JWT')).toBe('admin-token');
    expect(sessionStorage.getItem('UserName')).toBe('admin');
    expect(sessionStorage.getItem('UserEmail')).toBe('admin@example.com');
    expect(sessionStorage.getItem('Role')).toBe('Admin');
    expect(authService.checkLoginStatus).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/user-management']);
    sessionStorage.clear();
  });
});
