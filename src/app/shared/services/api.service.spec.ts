import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { EndPoints } from '../end-points';
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

  it('API SERVICE - should handle error response', () => {
    const loginModel: Login = { username: 'testuser', password: 'testpassword' };

    service.login(loginModel).subscribe(
      () => fail('should have failed with a 400 status'),
      (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    );

    const req = httpMock.expectOne(EndPoints.LOGIN);
    expect(req.request.method).toBe('POST');

    req.flush('Invalid credentials', { status: 400, statusText: 'Bad Request' });
  });
});
