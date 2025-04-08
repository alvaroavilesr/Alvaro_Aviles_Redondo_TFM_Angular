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

  it('API SERVICE - should send GET request with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    service.getUsers().subscribe();

    const req = httpMock.expectOne('http://localhost:8082/api/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
  });

  it('API SERVICE - should send a POST request to create a user with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const createUserModel = {
      username: 'newuser',
      firstname: 'New',
      lastname: 'User',
      email: 'newuser@example.com',
      password: 'newpassword',
      role: 'user'
    };

    const mockResponse = { message: 'User created successfully' };

    service.createUser(createUserModel).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.POST_USER}/user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({
      userName: 'newuser',
      userFirstName: 'New',
      userLastName: 'User',
      email: 'newuser@example.com',
      userPassword: 'newpassword'
    });

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a PUT request to update user data profile with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const field = 'UserEmail';
    const newValue = 'newemail@example.com';
    const mockResponse = { message: 'User data updated successfully' };

    service.updateUserDataProfile(field, newValue).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/${sessionStorage.getItem("UserName")}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ email: newValue });

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a PUT request to update user data profile for FirstName with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const field = 'FirstName';
    const newValue = 'NewFirstName';
    const mockResponse = { message: 'User data updated successfully' };

    service.updateUserDataProfile(field, newValue).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/${sessionStorage.getItem("UserName")}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ userFirstName: newValue });

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a PUT request to update user data profile for LastName with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const field = 'LastName';
    const newValue = 'NewLastName';
    const mockResponse = { message: 'User data updated successfully' };

    service.updateUserDataProfile(field, newValue).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/${sessionStorage.getItem("UserName")}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ userLastName: newValue });

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a PUT request to update user data profile for Password with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const field = 'Password';
    const newValue = 'NewPassword';
    const mockResponse = { message: 'User data updated successfully' };

    service.updateUserDataProfile(field, newValue).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/${sessionStorage.getItem("UserName")}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ userPassword: newValue });

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a PUT request to update user password with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const user = { userName: 'testuser' };
    const newPass = 'newpassword';
    const mockResponse = { message: 'Password updated successfully' };

    service.updateUserPassword(user, newPass).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/${user.userName}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ userPassword: newPass });

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a PUT request to update user role with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const user = { userName: 'testuser' };
    const newRole = 'admin';
    const mockResponse = { message: 'User role updated successfully' };

    service.updateUserRole(user, newRole).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.UPDATE_USER}/${user.userName}/${newRole}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should send a DELETE request to delete a user with Authorization header', () => {
    const mockToken = 'mock-jwt-token';
    sessionStorage.setItem('JWT', mockToken);

    const user = { userName: 'testuser' };
    const mockResponse = { message: 'User deleted successfully' };

    service.deleteUser(user).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.DELETE_USER}/${user.userName}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('API SERVICE - should fetch categories', () => {
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

  it('API SERVICE - should create a category', () => {
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

  it('API SERVICE - should update a category', () => {
    const mockResponse = { id: 1, name: 'Updated Category' };
    const token = 'mock-token';
    const createCategoryName = 'Updated Category';
    const id = 1;
    sessionStorage.setItem('JWT', token);

    service.updateCategory(createCategoryName, id).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.PUT_CATEGORY}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({ name: createCategoryName });
    req.flush(mockResponse);
  });

  it('API SERVICE - should delete a category', () => {
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

  it('API SERVICE - should send a GET request to fetch items with Authorization header', () => {
    const mockItems = [{ id: 1, name: 'Item 1' }];
    const token = 'mock-token';
    sessionStorage.setItem('JWT', token);

    service.getItems().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne(EndPoints.GET_ITEMS);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockItems);
  });

  it('API SERVICE - should send a POST request to create an item with Authorization header', () => {
    const mockResponse = { id: 1, name: 'New Item' };
    const token = 'mock-token';
    sessionStorage.setItem('JWT', token);

    const createItemModel = {
      itemName: 'New Item',
      itemDescription: 'Description',
      itemLongDescription: 'Long Description',
      itemSize: 'M',
      itemPrice: 100,
      itemImage: 'image.jpg'
    };
    const createItemCategory = 'Category1';

    service.createItem(createItemModel, createItemCategory).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.POST_ITEM}/Category1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({
      name: 'New Item',
      description: 'Description',
      longDescription: 'Long Description',
      size: 'M',
      price: 100,
      image: 'image.jpg'
    });
    req.flush(mockResponse);
  });

  it('API SERVICE - should send a DELETE request to delete an item with Authorization header', () => {
    const mockResponse = { message: 'Item deleted successfully' };
    const token = 'mock-token';
    const itemId = 1;
    sessionStorage.setItem('JWT', token);

    service.deleteItem(itemId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.DELETE_ITEM}/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('API SERVICE - should send a PUT request to update an item with Authorization header', () => {
    const mockResponse = { message: 'Item updated successfully' };
    const token = 'mock-token';
    sessionStorage.setItem('JWT', token);

    const updatedItem = {
      itemId: 1,
      name: 'Updated Item',
      description: 'Updated Description',
      longDescription: 'Updated Long Description',
      size: 'L',
      price: 150,
      image: 'updated-image.jpg'
    };

    service.updateItem(updatedItem).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.PUT_ITEM}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({
      name: 'Updated Item',
      description: 'Updated Description',
      longDescription: 'Updated Long Description',
      size: 'L',
      price: 150,
      image: 'updated-image.jpg'
    });
    req.flush(mockResponse);
  });

  it('API SERVICE - should send a PUT request to update an item category with Authorization header', () => {
    const mockResponse = { message: 'Item category updated successfully' };
    const token = 'mock-token';
    sessionStorage.setItem('JWT', token);

    const itemId = 1;
    const updatedCategory = 'NewCategory';

    service.updateItemCategory(itemId, updatedCategory).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${EndPoints.PUT_ITEM_CATEGORY}/${itemId}/NewCategory`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse);
  });
});
