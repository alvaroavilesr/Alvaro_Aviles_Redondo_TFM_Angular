import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSumaryComponent } from './order-sumary.component';
import {OrderSummaryService} from './orderSummary.service';
import {OrderManagementService} from '../../vendor/order-management/order-management.service';

describe('OrderSumaryComponent', () => {
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
});
