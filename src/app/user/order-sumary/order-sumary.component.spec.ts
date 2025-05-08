import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSumaryComponent } from './order-sumary.component';
import {OrderSummaryService} from './orderSummary.service';
import {of} from 'rxjs';

describe('OrderSumaryComponent tests', () => {
  let component: OrderSumaryComponent;
  let fixture: ComponentFixture<OrderSumaryComponent>;
  let orderSummaryService: jasmine.SpyObj<OrderSummaryService>;

  beforeEach(async () => {
    const orderSummarySpy = jasmine.createSpyObj('OrderSummaryService', [
      'getOrder'
    ]);
    await TestBed.configureTestingModule({
      imports: [OrderSumaryComponent],
      providers: [
        { provide: OrderSummaryService, useValue: orderSummarySpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSumaryComponent);
    component = fixture.componentInstance;
    orderSummaryService = TestBed.inject(OrderSummaryService) as jasmine.SpyObj<OrderSummaryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ORDER SUMMARY COMPONENT - ngOnInit debería llamar a loadOrderData', () => {
    spyOn(component, 'loadOrderData');

    component.ngOnInit();

    expect(component.loadOrderData).toHaveBeenCalled();
  });

  it('ORDER SUMMARY COMPONENT - loadOrderData debería cargar y formatear correctamente los datos del pedido', () => {
    const mockOrderId = '123';
    spyOn(sessionStorage, 'getItem').and.returnValue(mockOrderId);

    const mockOrder = {
      id: 123,
      date: '2023-11-15T10:30:00',
      price: 99.99999,
      items: [{ name: 'Producto 1', quantity: 2 }]
    };

    orderSummaryService.getOrder.and.returnValue(of(mockOrder));

    component.loadOrderData();

    expect(sessionStorage.getItem).toHaveBeenCalledWith('orderId');
    expect(orderSummaryService.getOrder).toHaveBeenCalledWith(mockOrderId);
    expect(component.selectedOrder).toEqual(mockOrder);
    expect(component.selectedOrder.price).toBe(100);
    expect(component.formattedDate).toBe('15/11/2023');
  });
});
