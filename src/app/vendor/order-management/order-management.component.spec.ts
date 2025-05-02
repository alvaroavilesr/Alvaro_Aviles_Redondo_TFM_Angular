import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementComponent } from './order-management.component';
import {ToastrService} from 'ngx-toastr';
import {OrderManagementService} from './order-management.service';

describe('OrderManagementComponent', () => {
  let component: OrderManagementComponent;
  let fixture: ComponentFixture<OrderManagementComponent>;
  let orderManagementService: jasmine.SpyObj<OrderManagementService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const orderManagementSpy = jasmine.createSpyObj('OrderManagementService', [
      'getOrders',
      'deleteOrder'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    await TestBed.configureTestingModule({
      imports: [OrderManagementComponent],
      providers: [
        { provide: OrderManagementService, useValue: orderManagementSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManagementComponent);
    component = fixture.componentInstance;
    orderManagementService = TestBed.inject(OrderManagementService) as jasmine.SpyObj<OrderManagementService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
