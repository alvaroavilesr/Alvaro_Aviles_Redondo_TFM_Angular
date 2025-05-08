import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnOrdersComponent } from './own-orders.component';
import {ToastrService} from 'ngx-toastr';
import {OwnOrdersService} from './own-orders.service';
import {of, throwError} from 'rxjs';

describe('OwnOrdersComponent', () => {
  let component: OwnOrdersComponent;
  let fixture: ComponentFixture<OwnOrdersComponent>;
  let ownOrdersService: jasmine.SpyObj<OwnOrdersService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const ownOrdersSpy = jasmine.createSpyObj('OwnOrdersService', [
      'getUserOrders',
      'deleteOrder'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    await TestBed.configureTestingModule({
      imports: [OwnOrdersComponent],
      providers: [
        { provide: OwnOrdersService, useValue: ownOrdersSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnOrdersComponent);
    component = fixture.componentInstance;
    ownOrdersService = TestBed.inject(OwnOrdersService) as jasmine.SpyObj<OwnOrdersService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('OWN ORDERS COMPONENT - ngOnInit debería llamar a loadOrders', () => {
    spyOn(component, 'loadOrders');
    component.ngOnInit();
    expect(component.loadOrders).toHaveBeenCalledTimes(1);
  });

  it('OWN ORDERS COMPONENT - loadOrders debería obtener órdenes correctamente y formatear precios', () => {
    const mockOrders = [
      { orderId: 1, date: '2023-06-15T10:30:00', price: 15.6789, status: 'COMPLETED' },
      { orderId: 2, date: '2023-07-20T14:45:00', price: 25.1234, status: 'PROCESSING' }
    ];

    ownOrdersService.getUserOrders.and.returnValue(of(mockOrders));
    component.loadOrders();

    expect(ownOrdersService.getUserOrders).toHaveBeenCalledTimes(1);
    expect(component.orders).toEqual(mockOrders);
    expect(component.filteredOrders).toEqual(component.orders);
    expect(component.filteredOrders[0].price).toEqual(15.68);
    expect(component.filteredOrders[1].price).toEqual(25.12);
    expect(component.isLoading).toBeFalse();
  });

  it('OWN ORDERS COMPONENT - loadOrders debería manejar correctamente valores de precio null o NaN', () => {
    const mockOrders = [
      { orderId: 1, price: null, status: 'COMPLETED' },
      { orderId: 2, price: NaN, status: 'PROCESSING' },
      { orderId: 3, price: 30.5678, status: 'PENDING' }
    ];

    ownOrdersService.getUserOrders.and.returnValue(of(mockOrders));

    component.loadOrders();

    expect(component.filteredOrders[0].price).toBeNull();
    expect(isNaN(component.filteredOrders[1].price)).toBeTrue();
    expect(component.filteredOrders[2].price).toEqual(30.57);
  });

  it('OWN ORDERS COMPONENT - loadOrders debería establecer isLoading a false en caso de error', () => {
    ownOrdersService.getUserOrders.and.returnValue(throwError(() => new Error('Error de red')));
    component.isLoading = true;

    component.loadOrders();

    expect(component.isLoading).toBeFalse();
    expect(component.orders.length).toEqual(0);
    expect(component.filteredOrders.length).toEqual(0);
  });

  it('OWN ORDERS COMPONENT - closeDetailsOrderModal debería cerrar el modal de detalles', () => {
    // Mock para Bootstrap Modal.getInstance
    const mockModal = jasmine.createSpyObj('modal', ['hide']);

    // Mock para document.getElementById
    spyOn(document, 'getElementById').and.returnValue({} as HTMLElement);

    // Mock para Bootstrap Modal global
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModal
      }
    };

    component.closeDetailsOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('detailsOrder');
    expect(mockModal.hide).toHaveBeenCalled();
  });

  it('OWN ORDERS COMPONENT - closeDetailsOrderModal no debería hacer nada si el elemento no existe', () => {
    spyOn(document, 'getElementById').and.returnValue(null);

    // No debería generar error
    component.closeDetailsOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('detailsOrder');
  });

  // Tests para openDetailsOrderModal
  it('OWN ORDERS COMPONENT - openDetailsOrderModal debería copiar la orden, formatear precio y fecha, y mostrar modal', () => {
    const mockOrder = {
      orderId: 1,
      price: 15.6789,
      date: '2023-06-15T10:30:00',
      status: 'COMPLETED'
    };

    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);

    spyOn(document, 'getElementById').and.returnValue({} as HTMLElement);

    (window as any).bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(mockModalInstance)
    };

    component.openDetailsOrderModal(mockOrder);

    // Verificar que se copiaron los datos correctamente
    expect(component.selectedOrder).toEqual({...mockOrder, price: 15.68});

    // Verificar formato de fecha (dd/mm/yyyy)
    expect(component.formattedDate).toBe('15/06/2023');

    // Verificar que se creó y mostró el modal
    expect(document.getElementById).toHaveBeenCalledWith('detailsOrder');
    expect((window as any).bootstrap.Modal).toHaveBeenCalled();
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  // Tests para closeDeleteOrderModal
  it('OWN ORDERS COMPONENT - closeDeleteOrderModal debería cerrar el modal de eliminación', () => {
    const mockModal = jasmine.createSpyObj('modal', ['hide']);

    spyOn(document, 'getElementById').and.returnValue({} as HTMLElement);

    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModal
      }
    };

    component.closeDeleteOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('deleteOrder');
    expect(mockModal.hide).toHaveBeenCalled();
  });

  // Tests para openDeleteOrderModal
  it('OWN ORDERS COMPONENT - openDeleteOrderModal debería copiar la orden, formatear precio y mostrar modal', () => {
    const mockOrder = {
      orderId: 2,
      price: 25.1234,
      status: 'PROCESSING'
    };

    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);

    spyOn(document, 'getElementById').and.returnValue({} as HTMLElement);

    (window as any).bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(mockModalInstance)
    };

    component.openDeleteOrderModal(mockOrder);

    // Verificar que se copiaron los datos correctamente
    expect(component.selectedOrder).toEqual({...mockOrder, price: 25.12});

    // Verificar que se creó y mostró el modal
    expect(document.getElementById).toHaveBeenCalledWith('deleteOrder');
    expect((window as any).bootstrap.Modal).toHaveBeenCalled();
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  // Test para deleteOrder
  it('OWN ORDERS COMPONENT - deleteOrder debería llamar al servicio y mostrar mensaje de éxito', () => {
    component.selectedOrder = { orderId: 3 };
    ownOrdersService.deleteOrder.and.returnValue(of({}));
    spyOn(component, 'closeDeleteOrderModal');
    spyOn(component, 'loadOrders');

    component.deleteOrder();

    expect(ownOrdersService.deleteOrder).toHaveBeenCalledWith(3);
    expect(toastrService.success).toHaveBeenCalledWith('Pedido cancelado correctamente.', 'Cancelar pedido');
    expect(component.closeDeleteOrderModal).toHaveBeenCalled();
    expect(component.loadOrders).toHaveBeenCalled();
  });

  it('OWN ORDERS COMPONENT - deleteOrder debería manejar errores y mostrar mensaje de error', () => {
    component.selectedOrder = { orderId: 4 };
    ownOrdersService.deleteOrder.and.returnValue(throwError(() => new Error('Error')));

    component.deleteOrder();

    expect(ownOrdersService.deleteOrder).toHaveBeenCalledWith(4);
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Cancelar pedido');
  });
});
