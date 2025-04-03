import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';
import {of, throwError} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

describe('UserManagementComponent tests', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let userManagementService: jasmine.SpyObj<UserManagementService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const userManagementSpy = jasmine.createSpyObj('UserManagementService', [
      'getUsers',
      'createUser',
      'updateUserData',
      'updateUserPassword',
      'updateUserRole',
      'deleteUser',
      'login'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [UserManagementComponent],
      providers: [
        { provide: UserManagementService, useValue: userManagementSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    userManagementService = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('USER MANAGEMENT - should create', () => {
    expect(component).toBeTruthy();
  });

  it('USER MANAGEMENT - should call getUsers on ngOnInit', () => {
    const mockUsers = [{ userName: 'testuser', role: [{ roleName: 'user' }] }];
    userManagementService.getUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(userManagementService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.filteredUsers).toEqual(mockUsers);
  });

  it('USER MANAGEMENT - should filter users by role', () => {
    component.users = [
      { userName: 'user1', role: [{ roleName: 'admin' }] },
      { userName: 'user2', role: [{ roleName: 'user' }] }
    ];
    component.filterUsersByRole('admin');

    expect(component.selectedRole).toBe('admin');
    expect(component.filteredUsers).toEqual([{ userName: 'user1', role: [{ roleName: 'admin' }] }]);
  });

  it('USER MANAGEMENT - should search users', () => {
    component.users = [
      { userName: 'user1', role: [{ roleName: 'admin' }] },
      { userName: 'user2', role: [{ roleName: 'user' }] }
    ];
    component.searchTerm = 'user1';
    component.searchUsers();

    expect(component.selectedRole).toBe('Any');
    expect(component.filteredUsers).toEqual([{ userName: 'user1', role: [{ roleName: 'admin' }] }]);
  });

  it('USER MANAGEMENT - should apply filters', () => {
    component.users = [
      { userName: 'user1', role: [{ roleName: 'admin' }] },
      { userName: 'user2', role: [{ roleName: 'user' }] }
    ];
    component.selectedRole = 'admin';
    component.searchTerm = 'user1';
    component.applyFilters();

    expect(component.filteredUsers).toEqual([{ userName: 'user1', role: [{ roleName: 'admin' }] }]);
  });

  it('USER MANAGEMENT - should open create user modal', () => {
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    component.openCreateUserModal();
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should create user', () => {
    const mockResponse = { message: 'Usuario creado correctamente.' };
    userManagementService.createUser.and.returnValue(of(mockResponse));
    spyOn(component, 'closeCreateUserModal');
    spyOn(window, 'setTimeout');

    component.createUser();

    expect(userManagementService.createUser).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Usuario creado correctamente.', 'Crear usuario');
    expect(component.closeCreateUserModal).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should close create user modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeCreateUserModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should open update user modal', () => {
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    const user = { userName: 'testuser' };
    component.openUpdateUserModal(user);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should update user data', () => {
    const mockResponse = { message: 'Datos actualizados correctamente.' };
    userManagementService.updateUserData.and.returnValue(of(mockResponse));
    spyOn(component, 'closeUpdateUserModal');
    spyOn(window, 'setTimeout');

    component.updateUserData();

    expect(userManagementService.updateUserData).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Datos actualizados correctamente.', 'Modificar datos usuario');
    expect(component.closeUpdateUserModal).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should close update user modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeUpdateUserModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should open update user password modal', () => {
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    const user = { userName: 'testuser' };
    component.openUpdateUserPassModal(user);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should close update user password modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeUpdateUserPassModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should close update user role modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeUpdateUserRoleModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should open update user role modal', () => {
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    const user = { userName: 'testuser' };
    component.openUpdateUserRoleModal(user);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should update user role', () => {
    const mockResponse = { message: 'Rol actualizado correctamente.' };
    userManagementService.updateUserRole.and.returnValue(of(mockResponse));
    spyOn(component, 'closeUpdateUserRoleModal');
    spyOn(window, 'setTimeout');

    component.updateUserRole();

    expect(userManagementService.updateUserRole).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Rol actualizado correctamente.', 'Modificar rol');
    expect(component.closeUpdateUserRoleModal).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should close delete user modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeDeleteUserModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should open delete user modal', () => {
    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: function() {
        return mockModal;
      }
    };
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    const user = { userName: 'testuser' };
    component.openDeleteUserModal(user);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should delete user', () => {
    const mockResponse = { message: 'Usuario eliminado correctamente' };
    userManagementService.deleteUser.and.returnValue(of(mockResponse));
    spyOn(component, 'closeDeleteUserModal');
    spyOn(window, 'setTimeout');

    component.deleteUser();

    expect(userManagementService.deleteUser).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith('Usuario eliminado correctamente', 'Eliminar usuario');
    expect(component.closeDeleteUserModal).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should show error message when createUser fails with status 400', () => {
    const errorResponse = { status: 400 };
    userManagementService.createUser.and.returnValue(throwError(errorResponse));
    component.createUser();
    expect(toastrService.error).toHaveBeenCalledWith('El formato del correo no es válido o el nombre de usuario está en uso.', 'Crear usuario');
  });

  it('USER MANAGEMENT - should show error message when updateUserData fails with status 400', () => {
    const errorResponse = { status: 400 };
    userManagementService.updateUserData.and.returnValue(throwError(errorResponse));
    component.updateUserData();
    expect(toastrService.error).toHaveBeenCalledWith('El formato del correo no es válido.', 'Crear usuario');
  });

  it('USER MANAGEMENT - should show error message when passwords do not match', () => {
    component.updateUserPassModel.newPass = 'newPass';
    component.updateUserPassModel.newPassConfirm = 'differentPass';
    userManagementService.login.and.returnValue(of({}));

    component.updateUserPass();

    expect(toastrService.error).toHaveBeenCalledWith('Las contraseñas no coinciden.', 'Modificar contraseña');
  });

  it('USER MANAGEMENT - should show error message when fields are empty', () => {
    component.updateUserPassModel.adminPass = '';
    component.updateUserPassModel.newPass = '';
    component.updateUserPassModel.newPassConfirm = '';
    userManagementService.login.and.returnValue(throwError({}));

    component.updateUserPass();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, completa todos los campos.', 'Modificar contraseña');
  });

  it('USER MANAGEMENT - should show error message when credentials are incorrect', () => {
    component.updateUserPassModel.adminPass = 'adminPass';
    component.updateUserPassModel.newPass = 'newPass';
    component.updateUserPassModel.newPassConfirm = 'newPass';
    userManagementService.login.and.returnValue(throwError({}));

    component.updateUserPass();

    expect(toastrService.error).toHaveBeenCalledWith('Revisa tus credenciales.', 'Modificar contraseña');
  });

  it('USER MANAGEMENT - should update password successfully', () => {
    component.updateUserPassModel.adminPass = 'adminPass';
    component.updateUserPassModel.newPass = 'newPass';
    component.updateUserPassModel.newPassConfirm = 'newPass';
    userManagementService.login.and.returnValue(of({}));
    spyOn(component, 'updatePass');

    component.updateUserPass();

    expect(component.updatePass).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should update password successfully', () => {
    const mockResponse = { message: 'Contraseña actualizada correctamente.' };
    userManagementService.updateUserPassword.and.returnValue(of(mockResponse));
    spyOn(component, 'closeUpdateUserPassModal');
    spyOn(window, 'setTimeout');

    component.updatePass();

    expect(userManagementService.updateUserPassword).toHaveBeenCalledWith(component.selectedUser, component.updateUserPassModel.newPass);
    expect(toastrService.success).toHaveBeenCalledWith('Contraseña actualizada correctamente.', 'Modificar contraseña');
    expect(component.closeUpdateUserPassModal).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('USER MANAGEMENT - should show error message when update password fails', () => {
    userManagementService.updateUserPassword.and.returnValue(throwError({}));

    component.updatePass();

    expect(userManagementService.updateUserPassword).toHaveBeenCalledWith(component.selectedUser, component.updateUserPassModel.newPass);
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado', 'Modificar contraseña');
  });

  it('USER MANAGEMENT - should show error message when updateUserRole fails', () => {
    userManagementService.updateUserRole.and.returnValue(throwError({}));

    component.updateUserRole();

    expect(userManagementService.updateUserRole).toHaveBeenCalledWith(component.selectedUser, component.newRole);
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Modificar rol');
  });

  it('USER MANAGEMENT - should show error message when deleteUser fails', () => {
    userManagementService.deleteUser.and.returnValue(throwError({}));

    component.deleteUser();

    expect(userManagementService.deleteUser).toHaveBeenCalledWith(component.selectedUser);
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Eliminar usuario');
  });
});
