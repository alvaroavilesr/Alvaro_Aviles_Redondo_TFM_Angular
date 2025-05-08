import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { ApiService } from '../../shared/services/api.service';
import { of, throwError } from 'rxjs';
import { OrderModel } from '../../shared/models/order.model';

describe('CartService tests', () => {
  let service: CartService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getItems', 'createOrder']);

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(CartService);
    apiServiceMock = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('CART SERVICE - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('CART SERVICE - debería llamar a apiService.getItems y devolver los items', () => {
    const mockItems = [
      { id: 1, name: 'Item 1', price: 10 },
      { id: 2, name: 'Item 2', price: 20 }
    ];

    apiServiceMock.getItems.and.returnValue(of(mockItems));

    service.getItems().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    expect(apiServiceMock.getItems).toHaveBeenCalled();
  });

  it('CART SERVICE - debería propagar el error cuando apiService.getItems falla', () => {
    const mockError = new Error('Error obteniendo items');

    apiServiceMock.getItems.and.returnValue(throwError(() => mockError));

    service.getItems().subscribe({
      next: () => fail('Se esperaba un error pero se recibió un valor'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    expect(apiServiceMock.getItems).toHaveBeenCalled();
  });

  it('CART SERVICE - debería llamar a apiService.createOrder con el modelo correcto', () => {
    const mockOrder: OrderModel = {
      address: 'Test Address',
      date: new Date(),
      itemIdsAndAmounts: [1,2,2,1]
    };

    const mockResponse = { message: 'Orden creada con éxito', orderId: 123 };

    apiServiceMock.createOrder.and.returnValue(of(mockResponse));

    service.makeOrder(mockOrder).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceMock.createOrder).toHaveBeenCalledWith(mockOrder);
  });

  it('CART SERVICE - debería propagar el error cuando apiService.createOrder falla', () => {
    const mockOrder: OrderModel = {
      address: 'Test Address',
      date: new Date(),
      itemIdsAndAmounts: [1,2,2,1]
    };

    const mockError = new Error('Error creando la orden');

    apiServiceMock.createOrder.and.returnValue(throwError(() => mockError));

    service.makeOrder(mockOrder).subscribe({
      next: () => fail('Se esperaba un error pero se recibió un valor'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    expect(apiServiceMock.createOrder).toHaveBeenCalledWith(mockOrder);
  });
});
