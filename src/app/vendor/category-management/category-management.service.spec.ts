import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryManagementService } from './category-management.service';
import { ApiService } from '../../shared/services/api.service';
import { EndPoints } from '../../shared/end-points';

describe('CategoryManagementService', () => {
  let service: CategoryManagementService;
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryManagementService, ApiService]
    });

    service = TestBed.inject(CategoryManagementService);
    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch categories', () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }];
    const token = 'mock-token';
    sessionStorage.setItem('JWT', token);

    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(EndPoints.GET_CATEGORIES);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockCategories);
  });

  it('should create a category', () => {
    const mockResponse = { id: 1, name: 'New Category' };
    const token = 'mock-token';
    const createCategoryName = 'New Category';
    sessionStorage.setItem('JWT', token);

    service.createCategory(createCategoryName).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(EndPoints.POST_CATEGORY);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ name: createCategoryName });
    req.flush(mockResponse);
  });

  it('should update a category', () => {
    const mockResponse = { id: 1, name: 'Updated Category' };
    const token = 'mock-token';
    const updateCategoryName = 'Updated Category';
    const id = 1;
    sessionStorage.setItem('JWT', token);

    service.updateCategory(updateCategoryName, id).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.PUT_CATEGORY}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ name: updateCategoryName });
    req.flush(mockResponse);
  });

  it('should delete a category', () => {
    const mockResponse = { message: 'Category deleted' };
    const token = 'mock-token';
    const id = 1;
    sessionStorage.setItem('JWT', token);

    service.deleteCategory(id).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.DELETE_CATEGORY}/${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockResponse);
  });
});
