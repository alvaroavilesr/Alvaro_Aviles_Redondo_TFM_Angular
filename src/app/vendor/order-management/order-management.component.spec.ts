import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementComponent } from './order-management.component';
import {ToastrService} from 'ngx-toastr';
import {OrderManagementService} from './order-management.service';
import {of, throwError} from 'rxjs';

describe('OrderManagementComponent tests', () => {
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

  it('ORDER MANAGEMENT COMPONENT - debería cargar los pedidos durante la inicialización', () => {
    const mockOrders = [
      { orderId: 1, userName: 'Usuario1', date: '2023-11-01T12:00:00', total: 100 },
      { orderId: 2, userName: 'Usuario2', date: '2023-11-02T13:00:00', total: 200 }
    ];

    orderManagementService.getOrders.and.returnValue(of(mockOrders));
    component.ngOnInit();

    expect(component.orders).toEqual(mockOrders);
    expect(component.filteredOrders).toEqual(mockOrders);
    expect(orderManagementService.getOrders).toHaveBeenCalledTimes(1);
  });

  it('ORDER MANAGEMENT COMPONENT - debería filtrar los pedidos según el término de búsqueda', () => {
    component.orders = [
      { orderId: 1, userName: 'Usuario1', date: '2023-11-01T12:00:00', total: 100 },
      { orderId: 2, userName: 'Usuario2', date: '2023-11-02T13:00:00', total: 200 },
      { orderId: 3, userName: 'Cliente3', date: '2023-11-03T14:00:00', total: 300 }
    ];

    component.searchTerm = 'usuario';
    component.searchOrders();

    expect(component.filteredOrders.length).toBe(2);
    expect(component.filteredOrders).toContain(component.orders[0]);
    expect(component.filteredOrders).toContain(component.orders[1]);

    component.searchTerm = 'cliente';
    component.searchOrders();

    expect(component.filteredOrders.length).toBe(1);
    expect(component.filteredOrders).toContain(component.orders[2]);

    component.searchTerm = 'xyz';
    component.searchOrders();

    expect(component.filteredOrders.length).toBe(0);
  });

  it('ORDER MANAGEMENT COMPONENT - debería cerrar el modal de detalles correctamente', () => {
    const mockModalElement = document.createElement('div');
    const mockModalInstance = jasmine.createSpyObj('Modal', ['hide']);

    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy().and.returnValue(mockModalInstance)
      }
    };

    component.closeDetailsOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('detailsOrder');
    expect((window as any).bootstrap.Modal.getInstance).toHaveBeenCalledWith(mockModalElement);
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ORDER MANAGEMENT COMPONENT - debería abrir el modal de detalles y formatear la fecha correctamente', () => {
    const mockOrder = {
      orderId: 1,
      userName: 'Usuario1',
      date: '2023-11-01T12:00:00',
      total: 100
    };
    const mockModalElement = document.createElement('div');
    const mockModalInstance = jasmine.createSpyObj('Modal', ['show']);

    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };

    component.openDetailsOrderModal(mockOrder);

    expect(component.selectedOrder).toEqual(mockOrder);
    expect(component.selectedOrder).not.toBe(mockOrder);
    expect(component.formattedDate).toBe('01/11/2023');
    expect(document.getElementById).toHaveBeenCalledWith('detailsOrder');
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(mockModalElement);
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ORDER MANAGEMENT COMPONENT - debería cerrar el modal de eliminación correctamente', () => {
    const mockModalElement = document.createElement('div');
    const mockModalInstance = jasmine.createSpyObj('Modal', ['hide']);

    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy().and.returnValue(mockModalInstance)
      }
    };

    component.closeDeleteOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('deleteOrder');
    expect((window as any).bootstrap.Modal.getInstance).toHaveBeenCalledWith(mockModalElement);
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ORDER MANAGEMENT COMPONENT - debería abrir el modal de eliminación correctamente', () => {
    const mockOrder = {
      orderId: 1,
      userName: 'Usuario1',
      date: '2023-11-01T12:00:00',
      total: 100
    };
    const mockModalElement = document.createElement('div');
    const mockModalInstance = jasmine.createSpyObj('Modal', ['show']);

    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };

    component.openDeleteOrderModal(mockOrder);

    expect(component.selectedOrder).toEqual(mockOrder);
    expect(component.selectedOrder).not.toBe(mockOrder);
    expect(document.getElementById).toHaveBeenCalledWith('deleteOrder');
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(mockModalElement);
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ORDER MANAGEMENT COMPONENT - debería eliminar un pedido correctamente', () => {
    component.selectedOrder = { orderId: 123, userName: 'Test User', total: 100 };
    orderManagementService.getOrders.and.returnValue(of([]));
    orderManagementService.deleteOrder.and.returnValue(of({}));

    spyOn(component, 'closeDeleteOrderModal');

    component.deleteOrder();

    expect(orderManagementService.deleteOrder).toHaveBeenCalledWith(123);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Pedido eliminado correctamente.',
      'Eliminar pedido'
    );
    expect(component.closeDeleteOrderModal).toHaveBeenCalled();
  });

  it('ORDER MANAGEMENT COMPONENT - debería manejar errores al eliminar un pedido', () => {
    component.selectedOrder = { orderId: 123, userName: 'Test User', total: 100 };
    orderManagementService.deleteOrder.and.returnValue(throwError(() => new Error('Error de prueba')));

    component.deleteOrder();

    expect(orderManagementService.deleteOrder).toHaveBeenCalledWith(123);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ha ocurrido un error inesperado.',
      'Eliminar pedido'
    );
  });
});
