import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

describe('RegisterComponent tests', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;
  let registerService: jasmine.SpyObj<RegisterService>;

  const createRegisterModel = (overrides = {}) => ({
    username: 'user',
    email: 'user@example.com',
    name: 'Name',
    surname: 'Surname',
    password: 'password',
    passwordRepeat: 'password',
    ...overrides,
  });

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    registerService = jasmine.createSpyObj('RegisterService', ['register']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RegisterComponent],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
        { provide: RegisterService, useValue: registerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if form is incomplete', () => {
    component.registerModel = createRegisterModel({ username: '' });
    component.register(new Event('submit'));
    expect(toastrService.error).toHaveBeenCalledWith('Por favor, completa todos los campos.', 'Registro');
  });

  it('should show error if passwords do not match', () => {
    component.registerModel = createRegisterModel({ password: 'password1', passwordRepeat: 'password2' });
    component.register(new Event('submit'));
    expect(toastrService.error).toHaveBeenCalledWith('Las contraseñas no coinciden.', 'Registro');
  });

  it('should show error if email format is invalid', () => {
    component.registerModel = createRegisterModel({ email: 'invalid-email' });
    component.register(new Event('submit'));
    expect(toastrService.error).toHaveBeenCalledWith('El formato del correo electrónico no es válido.', 'Registro');
  });

  it('should call register service on valid form submission', () => {
    component.registerModel = createRegisterModel();
    registerService.register.and.returnValue(of({}));
    component.register(new Event('submit'));
    expect(registerService.register).toHaveBeenCalledWith({
      username: 'user',
      email: 'user@example.com',
      name: 'Name',
      surname: 'Surname',
      password: 'password',
      passwordRepeat: 'password'
    });
  });

  it('should reset form on successful registration', () => {
    component.registerModel = createRegisterModel();
    registerService.register.and.returnValue(of({}));
    component.register(new Event('submit'));
    expect(component.registerModel).toEqual(createRegisterModel({
      username: '', email: '', name: '', surname: '', password: '', passwordRepeat: ''
    }));
  });

  it('should show error if registration fails with 400 status', () => {
    component.registerModel = createRegisterModel();
    registerService.register.and.returnValue(throwError(() => ({ status: 400 })));
    component.register(new Event('submit'));
    expect(toastrService.error).toHaveBeenCalledWith('El nombre de usuario ya está en uso.', 'Registro');
  });

  it('should show error if registration fails with unexpected error', () => {
    component.registerModel = createRegisterModel();
    registerService.register.and.returnValue(throwError(() => ({ status: 500 })));
    component.register(new Event('submit'));
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Registro');
  });
});
