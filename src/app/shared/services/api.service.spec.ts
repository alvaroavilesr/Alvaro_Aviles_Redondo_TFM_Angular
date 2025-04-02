import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { EndPoints } from '../end-points';
import { Register } from '../models/register.model';
import { Login } from '../models/login.model';

describe('ApiService tests', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('API SERVICE - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('API SERVICE - should send a POST request to login and return a response', () => {
    const loginModel: Login = { username: 'testuser', password: 'testpassword' };
    const mockResponse = { success: true, token: 'mocktoken' };

    service.login(loginModel).subscribe(response => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(EndPoints.LOGIN);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      userName: 'testuser',
      userPassword: 'testpassword'
    });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should handle error response for login', () => {
    const loginModel: Login = { username: 'testuser', password: 'testpassword' };

    service.login(loginModel).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(EndPoints.LOGIN);
    expect(req.request.method).toBe('POST');

    req.flush('Invalid credentials', { status: 400, statusText: 'Bad Request' });
  });

  it('API SERVICE - should send a POST request to register and return a response', () => {
    const registerModel: Register = {
      username: 'testUser',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User',
      password: 'testPassword',
      passwordRepeat: 'testPassword'
    };
    const mockResponse = { message: 'User registered successfully' };

    service.register(registerModel).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(EndPoints.REGISTER);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      userName: 'testUser',
      userFirstName: 'Test',
      userLastName: 'User',
      email: 'test@example.com',
      userPassword: 'testPassword'
    });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should handle error response for register', () => {
    const registerModel: Register = {
      username: 'testUser',
      email: 'test@example.com',
      name: 'Test',
      surname: 'User',
      password: 'testPassword',
      passwordRepeat: 'testPassword'
    };

    service.register(registerModel).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(EndPoints.REGISTER);
    expect(req.request.method).toBe('POST');

    req.flush('Invalid registration data', { status: 400, statusText: 'Bad Request' });
  });

  it('API SERVICE - should send a PUT request to update user data and return a response for email field', () => {
    const mockResponse = { message: 'User data updated successfully' };
    const updateData = {
      userName: 'testuser',
      email: 'newemail@example.com',
      userFirstName: 'Pedro',
      userLastName: 'Alonso',
    };
    sessionStorage.setItem('JWT', 'mockToken');
    service.updateUserData(updateData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should handle error response for update user data for email field', () => {
    const updateData = {
      userName: 'testuser',
      email: 'newemail@example.com'
    };
    sessionStorage.setItem('JWT', 'mockToken');
    service.updateUserData(updateData).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });
    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');
    req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
  });

  it('API SERVICE - should send a PUT request to update user data and return a response for firstname field', () => {
    const mockResponse = { message: 'User data updated successfully' };
    const updateData = {
      userName: 'testuser',
      userFirstName: 'Pedro'
    };
    sessionStorage.setItem('JWT', 'mockToken');

    service.updateUserData(updateData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should handle error response for update user data for firstname field', () => {
    const updateData = {
      userName: 'testuser',
      userFirstName: 'Pedro'
    };
    sessionStorage.setItem('JWT', 'mockToken');
    service.updateUserData(updateData).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');

    req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
  });

  it('API SERVICE - should send a PUT request to update user data and return a response for lastname field', () => {
    const mockResponse = { message: 'User data updated successfully' };
    const updateData = {
      userName: 'testuser',
      userLastName: 'Alonso'
    };
    sessionStorage.setItem('JWT', 'mockToken');
    service.updateUserData(updateData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should handle error response for update user data for lastname field', () => {
    const updateData = {
      userName: 'testuser',
      userLastName: 'Alonso'
    };
    sessionStorage.setItem('JWT', 'mockToken');
    service.updateUserData(updateData).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');

    req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
  });

  it('API SERVICE - should send a PUT request to update user data and return a response for password field', () => {
    const mockResponse = { success: true };
    const updateData = {
      userName: 'testuser',
      userPassword: 'newpassword'
    };
    sessionStorage.setItem('JWT', 'mockToken');

    service.updateUserData(updateData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should handle error response for update user data for password field', () => {
    const updateData = {
      userName: 'testuser',
      userPassword: 'newpassword'
    };
    sessionStorage.setItem('JWT', 'mockToken');
    service.updateUserData(updateData).subscribe({
      next: () => fail('should have failed with a 400 status'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      },
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/testuser`);
    expect(req.request.method).toBe('PUT');

    req.flush('Invalid data', { status: 400, statusText: 'Bad Request' });
  });
});
