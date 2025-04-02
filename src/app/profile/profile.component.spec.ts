import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('ProfileComponent tests', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    const profileSpy = jasmine.createSpyObj('ProfileService', ['login', 'updateUserData']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CommonModule, ProfileComponent],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: ProfileService, useValue: profileSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
  });

  it('PROFILE - should create the profile component', () => {
    expect(component).toBeTruthy();
  });

  it('PROFILE - should initialize userData from sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      const data: { [key: string]: string } = {
        'UserName': 'testUser',
        'UserEmail': 'test@example.com',
        'FirstName': 'Test',
        'LastName': 'User'
      };
      return data[key];
    });
    component.ngOnInit();
    expect(component.userData.username).toBe('testUser');
  });

  it('PROFILE - should call updateUserData on saveChanges', () => {
    spyOn(component, 'updateUserData');
    component.userData = { username: 'testuser' };
    component.fieldToEdit = 'FirstName';
    component.newValue = 'Nuevo Nombre';
    component.saveChanges();
    expect(component.updateUserData).toHaveBeenCalled();
  });

  it('PROFILE - should show error on failed update', () => {
    profileService.updateUserData.and.returnValue(throwError({ status: 401 }));
    component.userData = { username: 'testuser' };
    component.updateUserData();
    expect(toastrService.error).toHaveBeenCalledWith('Tu sesión ha expirado.', 'Perfil');
  });

  it('PROFILE - should return correct field label', () => {
    expect(component.getFieldLabel('UserEmail')).toBe('correo electrónico');
    expect(component.getFieldLabel('FirstName')).toBe('nombre');
    expect(component.getFieldLabel('LastName')).toBe('apellido');
    expect(component.getFieldLabel('Password')).toBe('contraseña');
    expect(component.getFieldLabel('UnknownField')).toBe('UnknownField');
  });

  it('PROFILE - should set email value on openModal with UserEmail field', () => {
    component.userData = {
      username: 'testuser1',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User'
    };
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openModal('UserEmail');
    expect(component.fieldToEdit).toBe('UserEmail');
    expect(component.newValue).toBe('test@example.com');
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('PROFILE - should set name value on openModal with FirstName field', () => {
    component.userData = {
      username: 'testuser2',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User'
    };
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openModal('FirstName');
    expect(component.fieldToEdit).toBe('FirstName');
    expect(component.newValue).toBe('Test');
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('PROFILE - should set surname value on openModal with LastName field', () => {
    component.userData = {
      username: 'testuser3',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User'
    };
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openModal('LastName');
    expect(component.fieldToEdit).toBe('LastName');
    expect(component.newValue).toBe('User');
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('PROFILE - should reset password fields on openModal with Password field', () => {
    component.userData = { username: 'testuser4' };
    component.currentPassword = 'oldpass';
    component.newPassword = 'oldnewpass';
    component.repeatNewPassword = 'oldrepeatpass';
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openModal('Password');
    expect(component.fieldToEdit).toBe('Password');
    expect(component.currentPassword).toBe('');
    expect(component.newPassword).toBe('');
    expect(component.repeatNewPassword).toBe('');
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('PROFILE - should set default value on openModal with unknown field', () => {
    component.userData = { username: 'testuser' };
    component.newValue = 'somevalue';
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    }
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openModal('UnknownField');
    expect(component.fieldToEdit).toBe('UnknownField');
    expect(component.newValue).toBe('');
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('PROFILE - should test closeModal method', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('PROFILE - should validate passwords match during saveChanges', () => {
    component.userData = { username: 'testuser' };
    component.fieldToEdit = 'Password';
    component.currentPassword = 'oldpass';
    component.newPassword = 'newpass';
    component.repeatNewPassword = 'differentpass';
    profileService.login.and.returnValue(of({}));
    component.saveChanges();
    expect(toastrService.error).toHaveBeenCalledWith('Las contraseñas no coinciden.', 'Perfil');
  });

  it('PROFILE - should validate empty fields during password change', () => {
    component.userData = { username: 'testuser' };
    component.fieldToEdit = 'Password';
    component.currentPassword = '';
    component.newPassword = 'newpass';
    component.repeatNewPassword = 'newpass';

    profileService.login.and.returnValue(of({}));

    component.saveChanges();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, completa todos los campos.', 'Perfil');
  });

  it('PROFILE - should update session storage on successful data update', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'closeModal');

    component.userData = { username: 'testuser' };
    component.fieldToEdit = 'FirstName';
    component.newValue = 'Nuevo Nombre';

    profileService.updateUserData.and.returnValue(of({}));

    component.updateUserData();

    expect(sessionStorage.setItem).toHaveBeenCalledWith('FirstName', 'Nuevo Nombre');
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('PROFILE - should show generic error on unexpected error', () => {
    profileService.updateUserData.and.returnValue(throwError({ status: 500 }));
    component.userData = { username: 'testuser' };

    component.updateUserData();

    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Perfil');
  });

  it('PROFILE - should handle successful login and password change', () => {
    component.userData = { username: 'testuser' };
    component.fieldToEdit = 'Password';
    component.currentPassword = 'currentpass';
    component.newPassword = 'newpass';
    component.repeatNewPassword = 'newpass';

    profileService.login.and.returnValue(of({}));
    spyOn(component, 'updateUserData');

    component.saveChanges();

    expect(profileService.login).toHaveBeenCalled();
    expect(component.newValue).toBe('newpass');
    expect(component.updateUserData).toHaveBeenCalled();
  });

  it('PROFILE - should show error message when login fails during password change', () => {
    component.userData = { username: 'testuser' };
    component.fieldToEdit = 'Password';
    component.currentPassword = 'wrongpassword';
    component.newPassword = 'newpass';
    component.repeatNewPassword = 'newpass';
    profileService.login.and.returnValue(throwError({ status: 401 }));
    component.saveChanges();
    expect(toastrService.error).toHaveBeenCalledWith('Revisa tus credenciales.', 'Perfil');
    spyOn(component, 'updateUserData');
    expect(component.updateUserData).not.toHaveBeenCalled();
  });

});
