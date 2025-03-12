import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { ApiService } from '../shared/services/api.service';
import { of } from 'rxjs';
import { Register } from '../shared/models/register.model';

describe('RegisterService tests', () => {
  let registerService: RegisterService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['register']);

    TestBed.configureTestingModule({
      providers: [
        RegisterService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });

    registerService = TestBed.inject(RegisterService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('REGISTER SERVICE - should be created', () => {
    expect(registerService).toBeTruthy();
  });

  it('REGISTER SERVICE - should call ApiService register method with correct data', () => {
    const mockRegisterModel: Register = {
      username: 'testUser',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User',
      password: 'testPassword',
      passwordRepeat: 'testPassword'
    };

    const expectedResponse = { body: { message: 'User registered successfully' } };
    apiServiceSpy.register.and.returnValue(of(expectedResponse));

    let result: any;
    registerService.register(mockRegisterModel).subscribe(response => {
      result = response;
    });

    expect(apiServiceSpy.register).toHaveBeenCalledWith(mockRegisterModel);
    expect(result).toEqual(expectedResponse);
  });

  it('REGISTER SERVICE - should pass through the API response without modification', () => {
    const mockRegisterModel: Register = {
      username: 'testUser',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User',
      password: 'testPassword',
      passwordRepeat: 'testPassword'
    };

    const mockResponse = {
      body: {
        message: 'User registered successfully',
        user: {
          username: 'testUser',
          email: 'test@example.com'
        }
      }
    };

    apiServiceSpy.register.and.returnValue(of(mockResponse));

    registerService.register(mockRegisterModel).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user.username).toBe('testUser');
    });
  });
});
