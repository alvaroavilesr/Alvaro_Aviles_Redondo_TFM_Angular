import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CartService} from './cart.service';
import {of, throwError} from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let routerService: jasmine.SpyObj<Router>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj('CartService', [
      'getItems',
      'makeOrder'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    routerService = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('CART COMPONENT - should create', () => {
    expect(component).toBeTruthy();
  });

  it('CART COMPONENT - debería obtener itemsAndAmounts de sessionStorage y llamar a loadCart', () => {
    const mockItems = [1, 2, 2, 1];
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockItems));

    spyOn(component, 'loadCart');

    component.ngOnInit();

    expect(sessionStorage.getItem).toHaveBeenCalledWith('itemsAndAmountsCart');
    expect(component.itemsAndAmounts).toEqual(mockItems);
    expect(component.loadCart).toHaveBeenCalled();
  });

  it('CART COMPONENT - debería manejar caso donde sessionStorage devuelve null', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    spyOn(component, 'loadCart');

    component.ngOnInit();

    expect(component.itemsAndAmounts).toBeNull();
    expect(component.loadCart).toHaveBeenCalled();
  });

  it('CART COMPONENT - debería limpiar cart cuando itemsAndAmounts es null', () => {
    component.itemsAndAmounts = [];
    component.isLoading = true;

    component.loadCart();

    expect(component.cart).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(cartService.getItems).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería limpiar cart cuando itemsAndAmounts está vacío', () => {
    component.itemsAndAmounts = [];
    component.isLoading = true;

    component.loadCart();

    expect(component.cart).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(cartService.getItems).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería cargar productos y calcular cantidades correctamente', () => {
    component.itemsAndAmounts = [1, 2, 2, 1, 1, 3];
    component.isLoading = true;

    const mockProducts = [
      { itemId: 1, name: 'Producto 1', price: 10 },
      { itemId: 2, name: 'Producto 2', price: 20 },
      { itemId: 3, name: 'Producto 3', price: 30 }
    ];

    cartService.getItems.and.returnValue(of(mockProducts));

    component.loadCart();

    expect(cartService.getItems).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);

    expect(component.cart).toEqual([
      { itemId: 1, name: 'Producto 1', price: 10, quantity: 5 },
      { itemId: 2, name: 'Producto 2', price: 20, quantity: 1 }
    ]);

    expect(component.isLoading).toBeFalse();
  });

  it('CART COMPONENT - debería sumar cantidades para productos duplicados', () => {
    component.itemsAndAmounts = [1, 2, 1, 3];

    const mockProducts = [
      { itemId: 1, name: 'Producto 1', price: 10 }
    ];

    cartService.getItems.and.returnValue(of(mockProducts));

    component.loadCart();

    expect(component.cart).toEqual([
      { itemId: 1, name: 'Producto 1', price: 10, quantity: 5 }
    ]);
  });

  it('CART COMPONENT - debería filtrar productos que no están en itemsAndAmounts', () => {
    component.itemsAndAmounts = [1, 2];

    const mockProducts = [
      { itemId: 1, name: 'Producto 1', price: 10 },
      { itemId: 2, name: 'Producto 2', price: 20 },
    ];

    cartService.getItems.and.returnValue(of(mockProducts));

    component.loadCart();

    expect(component.cart.length).toBe(1);
    expect(component.cart[0].itemId).toBe(1);
  });

  it('CART COMPONENT - debería manejar errores al cargar productos', () => {
    component.itemsAndAmounts = [1, 2];
    component.isLoading = true;

    cartService.getItems.and.returnValue(throwError(() => new Error('Error de carga')));

    component.loadCart();

    expect(component.isLoading).toBeFalse();
    expect(component.cart).toEqual([]);
  });

  it('CART COMPONENT - debería ocultar el modal si el elemento existe', () => {
    const mockModalElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    const mockModal = jasmine.createSpyObj('Modal', ['hide']);
    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy('getInstance').and.returnValue(mockModal)
      }
    };

    component.closeDetailsProductModal();

    expect(document.getElementById).toHaveBeenCalledWith('detailsProduct');
    expect((window as any).bootstrap.Modal.getInstance).toHaveBeenCalledWith(mockModalElement);
    expect(mockModal.hide).toHaveBeenCalled();
  });

  it('CART COMPONENT - no debería intentar ocultar el modal si el elemento no existe', () => {
    spyOn(document, 'getElementById').and.returnValue(null);

    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy('getInstance')
      }
    };

    component.closeDetailsProductModal();

    expect(document.getElementById).toHaveBeenCalledWith('detailsProduct');
    expect((window as any).bootstrap.Modal.getInstance).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería asignar producto seleccionado y mostrar el modal', () => {
    const mockProduct = { id: 1, name: 'Producto de prueba' };
    const mockModalElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(mockModal)
    };

    component.openDetailsProductModal(mockProduct);

    expect(component.selectedProduct).toEqual(mockProduct);
    expect(document.getElementById).toHaveBeenCalledWith('detailsProduct');
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(mockModalElement);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('CART COMPONENT - debería ocultar el modal si el elemento existe', () => {
    const mockModalElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    const mockModal = jasmine.createSpyObj('Modal', ['hide']);
    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy('getInstance').and.returnValue(mockModal)
      }
    };

    component.closeDeleteFromCartModal();

    expect(document.getElementById).toHaveBeenCalledWith('deleteFromCart');
    expect((window as any).bootstrap.Modal.getInstance).toHaveBeenCalledWith(mockModalElement);
    expect(mockModal.hide).toHaveBeenCalled();
  });

  it('CART COMPONENT - no debería intentar ocultar el modal si el elemento no existe', () => {
    spyOn(document, 'getElementById').and.returnValue(null);

    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy('getInstance')
      }
    };

    component.closeDeleteFromCartModal();

    expect(document.getElementById).toHaveBeenCalledWith('deleteFromCart');
    expect((window as any).bootstrap.Modal.getInstance).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería asignar producto seleccionado y mostrar el modal', () => {
    const mockProduct = { id: 1, name: 'Producto de prueba' };
    const mockModalElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(mockModal)
    };

    component.openDeleteFromCartModal(mockProduct);

    expect(component.selectedProduct).toEqual(mockProduct);
    expect(document.getElementById).toHaveBeenCalledWith('deleteFromCart');
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(mockModalElement);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('CART COMPONENT - debería eliminar un producto del carrito correctamente', () => {
    component.selectedProduct = { itemId: 2, name: 'Producto 2' };

    const originalCart = [1, 2, 2, 3, 3, 1];
    const expectedNewCart = [1, 2, 3, 1];

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(originalCart));
    spyOn(sessionStorage, 'setItem');

    spyOn(component, 'loadCart');
    spyOn(component, 'closeDeleteFromCartModal');

    component.deleteProductFromCart();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'itemsAndAmountsCart',
      JSON.stringify(expectedNewCart)
    );
    expect(component.itemsAndAmounts).toEqual(expectedNewCart);
    expect(component.loadCart).toHaveBeenCalled();
    expect(component.closeDeleteFromCartModal).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith(
      'Producto eliminado del carrito.',
      'Eliminar del carrito'
    );
  });

  it('CART COMPONENT - debería eliminar múltiples instancias del mismo producto', () => {
    component.selectedProduct = { itemId: 1, name: 'Producto 1' };

    const originalCart = [1, 2, 2, 3, 1, 4, 3, 1];
    const expectedNewCart = [2, 3, 3, 1];

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(originalCart));
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'loadCart');
    spyOn(component, 'closeDeleteFromCartModal');

    component.deleteProductFromCart();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'itemsAndAmountsCart',
      JSON.stringify(expectedNewCart)
    );
    expect(component.itemsAndAmounts).toEqual(expectedNewCart);
  });

  it('CART COMPONENT - debería funcionar correctamente si el producto no existe en el carrito', () => {
    component.selectedProduct = { itemId: 5, name: 'Producto inexistente' };

    const originalCart = [1, 2, 2, 3];

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(originalCart));
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'loadCart');
    spyOn(component, 'closeDeleteFromCartModal');

    component.deleteProductFromCart();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'itemsAndAmountsCart',
      JSON.stringify(originalCart)
    );
    expect(component.itemsAndAmounts).toEqual(originalCart);
  });

  it('CART COMPONENT - debería manejar un carrito vacío', () => {
    component.selectedProduct = { itemId: 1, name: 'Producto 1' };

    const emptyCart: any[] = [];

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(emptyCart));
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'loadCart');
    spyOn(component, 'closeDeleteFromCartModal');

    component.deleteProductFromCart();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'itemsAndAmountsCart',
      JSON.stringify(emptyCart)
    );
    expect(component.itemsAndAmounts).toEqual(emptyCart);
  });

  it('CART COMPONENT - debería ocultar el modal si el elemento existe', () => {
    const mockModalElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    const mockModal = jasmine.createSpyObj('Modal', ['hide']);
    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy('getInstance').and.returnValue(mockModal)
      }
    };

    component.closeMakeOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('makeOrder');
    expect((window as any).bootstrap.Modal.getInstance).toHaveBeenCalledWith(mockModalElement);
    expect(mockModal.hide).toHaveBeenCalled();
  });

  it('CART COMPONENT - no debería intentar ocultar el modal si el elemento no existe', () => {
    spyOn(document, 'getElementById').and.returnValue(null);

    (window as any).bootstrap = {
      Modal: {
        getInstance: jasmine.createSpy('getInstance')
      }
    };

    component.closeMakeOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('makeOrder');
    expect((window as any).bootstrap.Modal.getInstance).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería mostrar el modal correctamente', () => {
    const mockModalElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(mockModalElement);

    const mockModal = jasmine.createSpyObj('Modal', ['show']);
    (window as any).bootstrap = {
      Modal: jasmine.createSpy('Modal').and.returnValue(mockModal)
    };

    component.openMakeOrderModal();

    expect(document.getElementById).toHaveBeenCalledWith('makeOrder');
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(mockModalElement);
    expect(mockModal.show).toHaveBeenCalled();
  });

  it('CART COMPONENT - debería mostrar error si no se proporciona dirección', () => {
    component.itemsAndAmounts = [1, 2, 3, 1];
    component.orderModel.address = '';

    component.makeOrder();

    expect(toastrService.error).toHaveBeenCalledWith(
      'Por favor, introduce una dirección.',
      'Hacer pedido'
    );
    expect(cartService.makeOrder).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería mostrar error si la dirección solo contiene espacios', () => {
    component.itemsAndAmounts = [1, 2, 3, 1];
    component.orderModel.address = '   ';

    component.makeOrder();

    expect(toastrService.error).toHaveBeenCalledWith(
      'Por favor, introduce una dirección.',
      'Hacer pedido'
    );
    expect(cartService.makeOrder).not.toHaveBeenCalled();
  });

  it('CART COMPONENT - debería realizar el pedido correctamente con dirección válida', () => {
    component.itemsAndAmounts = [1, 2, 3, 1];
    component.orderModel.address = 'Calle Test 123';
    const mockResponse = { orderId: '12345' };

    spyOn(component, 'closeMakeOrderModal');
    spyOn(sessionStorage, 'removeItem');
    spyOn(sessionStorage, 'setItem');

    component.orderModel.date = new Date();

    cartService.makeOrder.and.returnValue(of(mockResponse));

    component.makeOrder();

    expect(component.orderModel.itemIdsAndAmounts).toEqual(component.itemsAndAmounts);

    expect(cartService.makeOrder).toHaveBeenCalledWith(component.orderModel);
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('itemsAndAmountsCart');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('orderId', mockResponse.orderId);
    expect(component.closeMakeOrderModal).toHaveBeenCalled();
    expect(routerService.navigate).toHaveBeenCalledWith(['/orderSummary']);
  });

  it('CART COMPONENT - debería mostrar error en caso de fallo del servicio', () => {
    component.itemsAndAmounts = [1, 2, 3, 1];
    component.orderModel.address = 'Calle Test 123';

    spyOn(component, 'closeMakeOrderModal');
    spyOn(sessionStorage, 'removeItem');
    spyOn(sessionStorage, 'setItem');

    cartService.makeOrder.and.returnValue(throwError(() => new Error('Error del servidor')));

    component.makeOrder();

    expect(cartService.makeOrder).toHaveBeenCalled();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ha ocurrido un error inesperado.',
      'Hacer pedido'
    );

    expect(sessionStorage.removeItem).not.toHaveBeenCalled();
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    expect(component.closeMakeOrderModal).not.toHaveBeenCalled();
    expect(routerService.navigate).not.toHaveBeenCalled();
  });
});

