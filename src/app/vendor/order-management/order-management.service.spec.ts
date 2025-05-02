import { TestBed } from '@angular/core/testing';
import { OrderManagementService } from './order-management.service';
import { ApiService } from '../../shared/services/api.service';
import { of } from 'rxjs';

describe('OrderManagementService tests', () => {
  let service: OrderManagementService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    // Crear un spy para ApiService
    const spy = jasmine.createSpyObj('ApiService', ['getOrders', 'deleteOrder']);

    TestBed.configureTestingModule({
      providers: [
        OrderManagementService,
        { provide: ApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(OrderManagementService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('ORDER MANAGEMENT SERVICE - debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('ORDER MANAGEMENT SERVICE - getOrders debería llamar al método getOrders del ApiService', () => {
    const mockOrders = [
      { id: 1, cliente: 'Cliente A', total: 100 },
      { id: 2, cliente: 'Cliente B', total: 200 }
    ];
    apiServiceSpy.getOrders.and.returnValue(of(mockOrders));

    service.getOrders().subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    expect(apiServiceSpy.getOrders).toHaveBeenCalledTimes(1);
  });

  it('ORDER MANAGEMENT SERVICE - deleteOrder debería llamar al método deleteOrder del ApiService con el ID correcto', () => {
    const mockResponse = { success: true };
    const orderId = 123;
    apiServiceSpy.deleteOrder.and.returnValue(of(mockResponse));

    service.deleteOrder(orderId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceSpy.deleteOrder).toHaveBeenCalledWith(orderId);
  });
});
