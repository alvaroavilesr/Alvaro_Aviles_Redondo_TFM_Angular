import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { ApiService } from '../shared/services/api.service';
import { of } from 'rxjs';
import { Login } from '../shared/models/login.model';

describe('LoginService tests', () => {
  let loginService: LoginService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['login']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });

    loginService = TestBed.inject(LoginService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('LOGIN SERVICE - should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('LOGIN SERVICE - should call ApiService login method with correct data', () => {
    const mockLoginModel: Login = {
      username: 'testUser',
      password: 'testPassword'
    };

    const expectedResponse = { body: { jwtToken: 'token' } };
    apiServiceSpy.login.and.returnValue(of(expectedResponse));

    let result: any;
    loginService.login(mockLoginModel).subscribe(response => {
      result = response;
    });

    expect(apiServiceSpy.login).toHaveBeenCalledWith(mockLoginModel);
    expect(result).toEqual(expectedResponse);
  });

  it('LOGIN SERVICE - should pass through the API response without modification', () => {
    const mockLoginModel: Login = {
      username: 'testUser',
      password: 'testPassword'
    };

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

    apiServiceSpy.login.and.returnValue(of(mockResponse));

    loginService.login(mockLoginModel).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.body.jwtToken).toBe('fake-token');
      expect(response.body.userResponse.userName).toBe('testUser');
    });
  });
});
