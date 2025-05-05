import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import {ToastrService} from 'ngx-toastr';
import {ShopService} from './shop.service';
import {of} from 'rxjs';

describe('UserHomeComponent tests', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let shopService: jasmine.SpyObj<ShopService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const ShopSpy = jasmine.createSpyObj('ShopService', [
      'getItems',
      'getCategories'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    await TestBed.configureTestingModule({
      imports: [ShopComponent],
      providers: [
        { provide: ShopService, useValue: ShopSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    shopService = TestBed.inject(ShopService) as jasmine.SpyObj<ShopService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('USER HOME - should create', () => {
    expect(component).toBeTruthy();
  });

  it('USER HOME - ngOnInit debería llamar a getItems y actualizar productos', () => {
    const mockItems = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    shopService.getItems.and.returnValue(of(mockItems));
    shopService.getCategories.and.returnValue(of([]));

    component.ngOnInit();

    expect(shopService.getItems).toHaveBeenCalled();
    expect(component.products).toEqual(mockItems);
    expect(component.filteredProducts).toEqual(mockItems);
  });

  it('USER HOME - ngOnInit debería llamar a getCategories y actualizar categorías', () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];

    shopService.getItems.and.returnValue(of([]));
    shopService.getCategories.and.returnValue(of(mockCategories));

    component.ngOnInit();

    expect(shopService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
  });

  it('USER HOME - filterProductsByCategory debería actualizar selectedCategory, resetear searchTerm y aplicar filtros', () => {
    component.selectedCategory = 'Any';
    component.searchTerm = 'test';

    spyOn(component, 'applyFilters');

    component.filterProductsByCategory('Category 1');

    expect(component.selectedCategory).toBe('Category 1');
    expect(component.searchTerm).toBe('');
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('USER HOME - searchProducts debería establecer selectedCategory como Any y aplicar filtros', () => {
    component.selectedCategory = 'Category 1';

    spyOn(component, 'applyFilters');

    component.searchProducts();

    expect(component.selectedCategory).toBe('Any');
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('USER HOME - applyFilters debería filtrar productos por término de búsqueda', () => {
    component.products = [
      { name: 'Product Apple', category: { name: 'Category 1' } },
      { name: 'Product Banana', category: { name: 'Category 1' } },
      { name: 'Other Item', category: { name: 'Category 2' } }
    ];
    component.selectedCategory = 'Any';
    component.searchTerm = 'product';

    component.applyFilters();

    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts[0].name).toBe('Product Apple');
    expect(component.filteredProducts[1].name).toBe('Product Banana');
  });

  it('USER HOME - applyFilters debería filtrar productos por categoría', () => {
    component.products = [
      { name: 'Product 1', category: { name: 'Category 1' } },
      { name: 'Product 2', category: { name: 'Category 1' } },
      { name: 'Product 3', category: { name: 'Category 2' } }
    ];
    component.selectedCategory = 'Category 2';
    component.searchTerm = '';

    component.applyFilters();

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 3');
  });

  it('USER HOME - applyFilters debería filtrar productos por término de búsqueda y categoría', () => {
    component.products = [
      { name: 'Tech Laptop', category: { name: 'Electronics' } },
      { name: 'Tech Phone', category: { name: 'Electronics' } },
      { name: 'Tech Camera', category: { name: 'Photography' } },
      { name: 'Book About Tech', category: { name: 'Books' } }
    ];
    component.selectedCategory = 'Electronics';
    component.searchTerm = 'tech';

    component.applyFilters();

    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts[0].name).toBe('Tech Laptop');
    expect(component.filteredProducts[1].name).toBe('Tech Phone');
  });

  it('ITEM MANAGEMENT - should close the details product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeDetailsProductModal();

    expect(document.getElementById).toHaveBeenCalledWith('detailsProduct');
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should open the details product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const product = { id: 1, name: 'Product 1' };

    component.openDetailsProductModal(product);

    expect(component.selectedProduct).toEqual(product);
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('detailsProduct'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should close the add to cart modal and reset amount', () => {
    component.amount = 5;
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeAddToCartModal();

    expect(document.getElementById).toHaveBeenCalledWith('addToCart');
    expect(mockModalInstance.hide).toHaveBeenCalled();
    expect(component.amount).toBeNull();
  });

  it('ITEM MANAGEMENT - should open the add to cart modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const product = { id: 1, name: 'Product 1' };

    component.openAddToCartModal(product);

    expect(component.selectedProduct).toEqual(product);
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('addToCart'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('USER HOME - addToCart should create cart in sessionStorage when empty', () => {
    component.selectedProduct = { itemId: 123, name: 'Product Test' };
    component.amount = 2;

    let getItemCallCount = 0;
    spyOn(sessionStorage, 'getItem').and.callFake(() => {
      getItemCallCount++;
      if (getItemCallCount === 1) {
        return null;
      } else {
        return '[]';
      }
    });
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'closeAddToCartModal');

    component.addToCart();

    expect(sessionStorage.getItem).toHaveBeenCalledWith('itemsAndAmountsCart');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('itemsAndAmountsCart', '[]');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('itemsAndAmountsCart', JSON.stringify([123, 2]));
    expect(toastrService.success).toHaveBeenCalledWith('Producto añadido al carrito.', 'Añadir al carrito');
    expect(component.closeAddToCartModal).toHaveBeenCalled();
  });

  it('USER HOME - addToCart should add items to existing cart in sessionStorage', () => {
    component.selectedProduct = { itemId: 456, name: 'Another Product' };
    component.amount = 3;
    const existingItems = [789, 1];

    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(existingItems));
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'closeAddToCartModal');

    component.addToCart();

    expect(sessionStorage.getItem).toHaveBeenCalledWith('itemsAndAmountsCart');
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'itemsAndAmountsCart',
      JSON.stringify([...existingItems, 456, 3])
    );
    expect(toastrService.success).toHaveBeenCalledWith('Producto añadido al carrito.', 'Añadir al carrito');
    expect(component.closeAddToCartModal).toHaveBeenCalled();
  });

  it('USER HOME - addToCart should show success message and close modal', () => {
    component.selectedProduct = { itemId: 123, name: 'Test Product' };
    component.amount = 1;
    spyOn(sessionStorage, 'getItem').and.returnValue('[]');
    spyOn(sessionStorage, 'setItem');
    spyOn(component, 'closeAddToCartModal');

    component.addToCart();

    expect(toastrService.success).toHaveBeenCalledWith('Producto añadido al carrito.', 'Añadir al carrito');
    expect(component.closeAddToCartModal).toHaveBeenCalled();
  });
});
