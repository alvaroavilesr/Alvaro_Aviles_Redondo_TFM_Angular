import { TestBed } from '@angular/core/testing';
import { ApiService } from '../../shared/services/api.service';
import { of, throwError } from 'rxjs';
import {OrderSummaryService} from './orderSummary.service';

describe('OrderSummaryService tests', () => {
  let service: OrderSummaryService;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getOrder']);

    TestBed.configureTestingModule({
      providers: [
        OrderSummaryService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(OrderSummaryService);
    apiServiceMock = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('ORDER SUMMARY SERVICE - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ORDER SUMMARY SERVICE - debería llamar a apiService.getOrder con el ID correcto', () => {
    const mockOrderId = 123;
    const mockOrderResponse = {
      orderId: mockOrderId,
      date: '2023-11-01',
      items: [],
      total: 100
    };

    apiServiceMock.getOrder.and.returnValue(of(mockOrderResponse));

    service.getOrder(mockOrderId).subscribe(response => {
      expect(response).toEqual(mockOrderResponse);
    });

    expect(apiServiceMock.getOrder).toHaveBeenCalledWith(mockOrderId);
  });

  it('ORDER SUMMARY SERVICE - debería propagar el error cuando apiService.getOrder falla', () => {
    const mockOrderId = 123;
    const mockError = new Error('Error obteniendo el pedido');

    apiServiceMock.getOrder.and.returnValue(throwError(() => mockError));

    service.getOrder(mockOrderId).subscribe({
      next: () => fail('Se esperaba un error pero se recibió un valor'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    expect(apiServiceMock.getOrder).toHaveBeenCalledWith(mockOrderId);
  });
});
