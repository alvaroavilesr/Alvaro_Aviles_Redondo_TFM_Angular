import { TestBed } from '@angular/core/testing';
import { OwnOrdersService } from './own-orders.service';
import { ApiService } from '../../shared/services/api.service';
import { of } from 'rxjs';

describe('OwnOrdersService', () => {
  let service: OwnOrdersService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getUserOrders', 'deleteOrder']);

    TestBed.configureTestingModule({
      providers: [
        OwnOrdersService,
        { provide: ApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(OwnOrdersService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('OWN ORDERS SERVICE - debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('OWN ORDERS SERVICE - getUserOrders debería llamar al método getUserOrders de ApiService', () => {
    const mockOrders = [
      { orderId: 1, date: '2023-06-15', status: 'COMPLETED' },
      { orderId: 2, date: '2023-07-20', status: 'PROCESSING' }
    ];

    apiServiceSpy.getUserOrders.and.returnValue(of(mockOrders));

    service.getUserOrders().subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    expect(apiServiceSpy.getUserOrders).toHaveBeenCalledTimes(1);
  });

  it('OWN ORDERS SERVICE - deleteOrder debería llamar al método deleteOrder de ApiService con el ID correcto', () => {
    const orderId = 123;
    const mockResponse = { success: true };

    apiServiceSpy.deleteOrder.and.returnValue(of(mockResponse));

    service.deleteOrder(orderId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiServiceSpy.deleteOrder).toHaveBeenCalledWith(orderId);
    expect(apiServiceSpy.deleteOrder).toHaveBeenCalledTimes(1);
  });
});
