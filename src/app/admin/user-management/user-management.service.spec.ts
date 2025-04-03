import { TestBed } from '@angular/core/testing';
import { UserManagementService } from './user-management.service';
import { ApiService } from '../../shared/services/api.service';
import { of } from 'rxjs';
import { Login } from '../../shared/models/login.model';
import { CreateUserModel } from '../../shared/models/createUser.model';

describe('UserManagementService tests', () => {
  let service: UserManagementService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', [
      'login',
      'getUsers',
      'createUser',
      'updateUserData',
      'updateUserPassword',
      'updateUserRole',
      'deleteUser'
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserManagementService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });

    service = TestBed.inject(UserManagementService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('USER MANAGEMENT SERVICE - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('USER MANAGEMENT SERVICE - should call login method of ApiService', () => {
    const loginModel: Login = { username: 'testuser', password: 'testpassword' };
    const mockResponse = { success: true, token: 'mocktoken' };
    apiService.login.and.returnValue(of(mockResponse));

    service.login(loginModel).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.login).toHaveBeenCalledWith(loginModel);
  });

  it('USER MANAGEMENT SERVICE - should call getUsers method of ApiService', () => {
    const mockResponse = [{ username: 'testuser' }];
    apiService.getUsers.and.returnValue(of(mockResponse));

    service.getUsers().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.getUsers).toHaveBeenCalled();
  });

  it('USER MANAGEMENT SERVICE - should call createUser method of ApiService', () => {
    const createUserModel: CreateUserModel = {
      username: 'newuser',
      firstname: 'New',
      lastname: 'User',
      email: 'newuser@example.com',
      password: 'newpassword',
      role: 'user'
    };
    const mockResponse = { message: 'User created successfully' };
    apiService.createUser.and.returnValue(of(mockResponse));

    service.createUser(createUserModel).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.createUser).toHaveBeenCalledWith(createUserModel);
  });

  it('USER MANAGEMENT SERVICE - should call updateUserData method of ApiService', () => {
    const updateUserData = { username: 'testuser', email: 'newemail@example.com' };
    const mockResponse = { message: 'User data updated successfully' };
    apiService.updateUserData.and.returnValue(of(mockResponse));

    service.updateUserData(updateUserData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.updateUserData).toHaveBeenCalledWith(updateUserData);
  });

  it('USER MANAGEMENT SERVICE - should call updateUserPassword method of ApiService', () => {
    const user = { username: 'testuser' };
    const newPass = 'newpassword';
    const mockResponse = { message: 'Password updated successfully' };
    apiService.updateUserPassword.and.returnValue(of(mockResponse));

    service.updateUserPassword(user, newPass).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.updateUserPassword).toHaveBeenCalledWith(user, newPass);
  });

  it('USER MANAGEMENT SERVICE - should call updateUserRole method of ApiService', () => {
    const user = { username: 'testuser' };
    const newRole = 'admin';
    const mockResponse = { message: 'User role updated successfully' };
    apiService.updateUserRole.and.returnValue(of(mockResponse));

    service.updateUserRole(user, newRole).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.updateUserRole).toHaveBeenCalledWith(user, newRole);
  });

  it('USER MANAGEMENT SERVICE - should call deleteUser method of ApiService', () => {
    const user = { username: 'testuser' };
    const mockResponse = { message: 'User deleted successfully' };
    apiService.deleteUser.and.returnValue(of(mockResponse));

    service.deleteUser(user).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.deleteUser).toHaveBeenCalledWith(user);
  });
});
