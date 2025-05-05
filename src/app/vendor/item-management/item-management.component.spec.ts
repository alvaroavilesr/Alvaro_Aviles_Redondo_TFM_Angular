import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemManagementComponent } from './item-management.component';;
import {ToastrService} from 'ngx-toastr';
import {ItemManagementService} from './item-management.service';
import {of, throwError} from 'rxjs';

describe('ItemManagementComponent', () => {
  let component: ItemManagementComponent;
  let fixture: ComponentFixture<ItemManagementComponent>;
  let itemManagementService: jasmine.SpyObj<ItemManagementService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const itemManagementSpy = jasmine.createSpyObj('ItemManagementService', [
      'getItems',
      'getCategories',
      'createItem',
      'deleteItem',
      'updateItem',
      'updateItemCategory'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    await TestBed.configureTestingModule({
      imports: [ItemManagementComponent],
      providers: [
        { provide: ItemManagementService, useValue: itemManagementSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemManagementComponent);
    component = fixture.componentInstance;
    itemManagementService = TestBed.inject(ItemManagementService) as jasmine.SpyObj<ItemManagementService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('ITEM MANAGEMENT - should create', () => {
    expect(component).toBeTruthy();
  });

  it('ITEM MANAGEMENT - should initialize products and categories on ngOnInit', () => {
    const mockProducts = [{ id: 1, name: 'Product 1', category: { name: 'Category 1' } }];
    const mockCategories = [{ id: 1, name: 'Category 1' }];
    itemManagementService.getItems.and.returnValue(of(mockProducts));
    itemManagementService.getCategories.and.returnValue(of(mockCategories));

    component.ngOnInit();

    expect(itemManagementService.getItems).toHaveBeenCalled();
    expect(itemManagementService.getCategories).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.categories).toEqual(mockCategories);
  });

  it('ITEM MANAGEMENT - should load images on loadImages', () => {
    component.loadImages();

    expect(component.images).toEqual([
      'CamisaAzul',
      'CamisaBlanca',
      'CamisetaAzul',
      'CamisetaBlanca',
      'CamisetaNegra',
      'GorraBlanca',
      'GorraRoja',
      'PoloBlanco',
      'PoloNegro',
      'SudaderaAzul',
      'SudaderaBlanca',
      'SudaderaGris',
      'SudaderaNegra',
      'Vaqueros1',
      'Vaqueros2'
    ]);
  });

  it('ITEM MANAGEMENT - should filter products by category', () => {
    component.products = [
      { id: 1, name: 'Product 1', category: { name: 'Category 1' } },
      { id: 2, name: 'Product 2', category: { name: 'Category 2' } }
    ];

    component.filterProductsByCategory('Category 1');

    expect(component.selectedCategory).toBe('Category 1');
    expect(component.searchTerm).toBe('');
    expect(component.filteredProducts).toEqual([
      { id: 1, name: 'Product 1', category: { name: 'Category 1' } }
    ]);
  });

  it('ITEM MANAGEMENT - should reset category to Any and apply filters on searchProducts', () => {
    component.products = [
      { id: 1, name: 'Product 1', category: { name: 'Category 1' } },
      { id: 2, name: 'Product 2', category: { name: 'Category 2' } }
    ];
    component.searchTerm = 'Product 2';

    component.searchProducts();

    expect(component.selectedCategory).toBe('Any');
    expect(component.filteredProducts).toEqual([
      { id: 2, name: 'Product 2', category: { name: 'Category 2' } }
    ]);
  });

  it('ITEM MANAGEMENT - should apply filters correctly', () => {
    component.products = [
      { id: 1, name: 'Product 1', category: { name: 'Category 1' } },
      { id: 2, name: 'Product 2', category: { name: 'Category 2' } },
      { id: 3, name: 'Another Product', category: { name: 'Category 1' } }
    ];
    component.searchTerm = 'Product';
    component.selectedCategory = 'Category 1';

    component.applyFilters();

    expect(component.filteredProducts).toEqual([
      { id: 1, name: 'Product 1', category: { name: 'Category 1' } },
      { id: 3, name: 'Another Product', category: { name: 'Category 1' } }
    ]);
  });

  it('ITEM MANAGEMENT - should close the create product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeCreateProductModal();

    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should open the create product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };

    component.openCreateProductModal();

    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('createItemModal'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when all fields are empty', () => {
    component.createItemModel = {
      itemName: '',
      itemDescription: '',
      itemLongDescription: '',
      itemSize: '',
      itemPrice: '',
      itemImage: ''
    };
    component.createItemCategory = '';

    component.createProduct();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, completa todos los campos.', 'Crear producto');
    expect(itemManagementService.createItem).not.toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when some fields are empty', () => {
    component.createItemModel = {
      itemName: 'Product Name',
      itemDescription: '',
      itemLongDescription: 'Long Description',
      itemSize: 'M',
      itemPrice: '100',
      itemImage: 'image.jpg'
    };
    component.createItemCategory = 'Category 1';

    component.createProduct();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, completa todos los campos.', 'Crear producto');
    expect(itemManagementService.createItem).not.toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when service call fails', () => {
    component.createItemModel = {
      itemName: 'Product Name',
      itemDescription: 'Description',
      itemLongDescription: 'Long Description',
      itemSize: 'M',
      itemPrice: '100',
      itemImage: 'image.jpg'
    };
    component.createItemCategory = 'Category 1';
    itemManagementService.createItem.and.returnValue(throwError(() => new Error('error')));

    component.createProduct();

    expect(itemManagementService.createItem).toHaveBeenCalledWith(component.createItemModel, component.createItemCategory);
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado', 'Crear producto');
  });

  it('ITEM MANAGEMENT - should format image name correctly', () => {
    const imagePath = 'path/to/CamisaAzul.jpg';
    const formattedName = component.formatImageName(imagePath);

    expect(formattedName).toBe('Camisa Azul');
  });

  it('ITEM MANAGEMENT - should return an empty string when imagePath is invalid', () => {
    const result = component.formatImageName('');
    expect(result).toBe('');
  });

  it('ITEM MANAGEMENT - should close the delete product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeDeleteProductModal();

    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should open the delete product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const product = { id: 1, name: 'Product 1' };

    component.openDeleteProductModal(product);

    expect(component.selectedProduct).toEqual(product);
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('deleteProduct'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should delete product successfully', () => {
    component.selectedProduct = { itemId: 1, name: 'Product 1' };
    itemManagementService.deleteItem.and.returnValue(of({}));

    spyOn(component, 'closeDeleteProductModal');

    component.deleteProduct();

    expect(itemManagementService.deleteItem).toHaveBeenCalledWith(1);
    expect(toastrService.success).toHaveBeenCalledWith('Producto eliminado correctamente.', 'Eliminar producto');
    expect(component.closeDeleteProductModal).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when product is associated with an order', () => {
    component.selectedProduct = { itemId: 1, name: 'Product 1' };
    itemManagementService.deleteItem.and.returnValue(throwError(() => new Error('error')));

    component.deleteProduct();

    expect(itemManagementService.deleteItem).toHaveBeenCalledWith(1);
    expect(toastrService.error).toHaveBeenCalledWith('El producto está asociado a un pedido.', 'Eliminar producto');
  });

  it('ITEM MANAGEMENT - should create product successfully when all fields are filled', () => {
    component.createItemModel = {
      itemName: 'Product Name',
      itemDescription: 'Description',
      itemLongDescription: 'Long Description',
      itemSize: 'M',
      itemPrice: '100',
      itemImage: 'image.jpg'
    };
    component.createItemCategory = 'Category 1';
    itemManagementService.createItem.and.returnValue(of({}));

    spyOn(component, 'closeCreateProductModal');

    component.createProduct();

    expect(itemManagementService.createItem).toHaveBeenCalledWith(component.createItemModel, component.createItemCategory);
    expect(toastrService.success).toHaveBeenCalledWith('Producto creado correctamente.', 'Crear producto');
    expect(component.closeCreateProductModal).toHaveBeenCalled();
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

  it('ITEM MANAGEMENT - should close the update product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeUpdateProductModal();

    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should open the update product modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const product = { id: 1, name: 'Product 1' };

    component.openUpdateProductModal(product);

    expect(component.selectedProduct).toEqual(product);
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('updateProductData'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when all fields are empty', () => {
    component.selectedProduct = {
      name: '',
      description: '',
      longDescription: '',
      size: '',
      price: '',
      image: '',
      category: ''
    };

    component.updateProductData();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, rellena todos los campos.', 'Modificar producto');
    expect(itemManagementService.updateItem).not.toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when some fields are empty', () => {
    component.selectedProduct = {
      name: 'Product Name',
      description: '',
      longDescription: 'Long Description',
      size: 'M',
      price: '100',
      image: 'image.jpg',
      category: 'Category 1'
    };

    component.updateProductData();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, rellena todos los campos.', 'Modificar producto');
    expect(itemManagementService.updateItem).not.toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should update product successfully when all fields are filled', () => {
    component.selectedProduct = {
      name: 'Product Name',
      description: 'Description',
      longDescription: 'Long Description',
      size: 'M',
      price: '100',
      image: 'image.jpg',
      category: 'Category 1'
    };
    itemManagementService.updateItem.and.returnValue(of({}));

    spyOn(component, 'closeUpdateProductModal');

    component.updateProductData();

    expect(itemManagementService.updateItem).toHaveBeenCalledWith(component.selectedProduct);
    expect(toastrService.success).toHaveBeenCalledWith('Producto modificado correctamente.', 'Modificar producto');
    expect(component.closeUpdateProductModal).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when service call fails', () => {
    component.selectedProduct = {
      name: 'Product Name',
      description: 'Description',
      longDescription: 'Long Description',
      size: 'M',
      price: '100',
      image: 'image.jpg',
      category: 'Category 1'
    };
    itemManagementService.updateItem.and.returnValue(throwError(() => new Error('error')));

    component.updateProductData();

    expect(itemManagementService.updateItem).toHaveBeenCalledWith(component.selectedProduct);
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Modificar producto');
  });

  it('ITEM MANAGEMENT - should close the update item category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeUpdateItemCategoryModal();

    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should open the update item category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const product = { id: 1, name: 'Product 1', category: { name: 'Category 1' } };

    component.openUpdateItemCategoryModal(product);

    expect(component.selectedProduct).toEqual(product);
    expect(component.updateCategory).toBe('Category 1');
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('updateItemCategory'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when updateCategory is empty', () => {
    component.updateCategory = '';
    component.selectedProduct = { itemId: 1 };

    component.updateItemCategory();

    expect(toastrService.error).toHaveBeenCalledWith('Por favor, rellena todos los campos.', 'Modificar categoria producto');
    expect(itemManagementService.updateItemCategory).not.toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should update category successfully when updateCategory is valid', () => {
    component.updateCategory = 'New Category';
    component.selectedProduct = { itemId: 1 };
    itemManagementService.updateItemCategory.and.returnValue(of({}));

    spyOn(component, 'closeUpdateItemCategoryModal');

    component.updateItemCategory();

    expect(itemManagementService.updateItemCategory).toHaveBeenCalledWith(1, 'New Category');
    expect(toastrService.success).toHaveBeenCalledWith('Categoria modificada correctamente.', 'Modificar categoria producto');
    expect(component.closeUpdateItemCategoryModal).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT - should show error when service call fails', () => {
    component.updateCategory = 'New Category';
    component.selectedProduct = { itemId: 1 };
    itemManagementService.updateItemCategory.and.returnValue(throwError(() => new Error('error')));

    component.updateItemCategory();

    expect(itemManagementService.updateItemCategory).toHaveBeenCalledWith(1, 'New Category');
    expect(toastrService.error).toHaveBeenCalledWith('Ha ocurrido un error inesperado.', 'Modificar categoria producto');
  });
});
