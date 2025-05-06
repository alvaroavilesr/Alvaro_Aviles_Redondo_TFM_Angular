import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryManagementComponent } from './category-management.component';
import {ToastrService} from 'ngx-toastr';
import {CategoryManagementService} from './category-management.service';
import {of, throwError} from 'rxjs';

describe('CategoryManagement tests', () => {
  let component: CategoryManagementComponent;
  let fixture: ComponentFixture<CategoryManagementComponent>;
  let categoryManagementService: jasmine.SpyObj<CategoryManagementService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const categoryManagementSpy = jasmine.createSpyObj('categoryManagementService', [
      'getCategories',
      'createCategory',
      'updateCategory',
      'deleteCategory'
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    await TestBed.configureTestingModule({
      imports: [CategoryManagementComponent],
      providers: [
        { provide: CategoryManagementService, useValue: categoryManagementSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagementComponent);
    component = fixture.componentInstance;
    categoryManagementService = TestBed.inject(CategoryManagementService) as jasmine.SpyObj<CategoryManagementService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('CATEGORY MANAGEMENT - should create', () => {
    expect(component).toBeTruthy();
  });

  it('CATEGORY MANAGEMENT - should fetch categories on ngOnInit', () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }];
    categoryManagementService.getCategories.and.returnValue(of(mockCategories));
    component.ngOnInit();
    expect(categoryManagementService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
    expect(component.filteredCategories).toEqual(mockCategories);
  });

  it('CATEGORY MANAGEMENT - should close create category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeCreateCategoryModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should open create category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    component.openCreateCategoryModal();
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('createCategoryModal'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should create category successfully', () => {
    const categoryName = 'New Category';
    component.createCategoryName = categoryName;
    categoryManagementService.createCategory.and.returnValue(of({}));
    spyOn(component, 'closeCreateCategoryModal');

    categoryManagementService.getCategories.and.returnValue(of([]));

    component.createCategory();

    expect(categoryManagementService.createCategory).toHaveBeenCalledWith(categoryName);
    expect(toastrService.success).toHaveBeenCalledWith('Categoria creada correctamente.', 'Crear categoria');
    expect(component.closeCreateCategoryModal).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should handle create category error', () => {
    component.createCategoryName = '';
    component.createCategory();
    expect(toastrService.error).toHaveBeenCalledWith('Por favor, rellena todos los campos.', 'Crear categoria');
  });

  it('CATEGORY MANAGEMENT - should filter categories based on search term', () => {
    component.categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Another Category' }
    ];

    component.searchTerm = 'Category';
    component.searchCategories();
    expect(component.filteredCategories).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Another Category' }
    ]);

    component.searchTerm = 'Another';
    component.searchCategories();
    expect(component.filteredCategories).toEqual([
      { id: 3, name: 'Another Category' }
    ]);

    component.searchTerm = 'Nonexistent';
    component.searchCategories();
    expect(component.filteredCategories).toEqual([]);
  });

  it('CATEGORY MANAGEMENT - should close update category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };
    component.closeUpdateCategoryModal();
    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should open update category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const category = { id: 1, name: 'Category 1' };
    component.openUpdateCategoryModal(category);
    expect(component.updateCategoryName).toBe(category.name);
    expect(component.selectedCategory).toEqual(category);
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('updateCategoryName'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should update category successfully', () => {
    component.selectedCategory = { id: 1, name: 'Category 1', categoryId: 1 };
    component.updateCategoryName = 'Updated Category';
    categoryManagementService.getCategories.and.returnValue(of([]));
    categoryManagementService.updateCategory.and.returnValue(of({}));
    spyOn(component, 'closeUpdateCategoryModal');
    component.updateCategory();
    expect(categoryManagementService.updateCategory).toHaveBeenCalledWith('Updated Category', 1);
    expect(toastrService.success).toHaveBeenCalledWith('Categoria modificada correctamente.', 'Modificar categoria');
    expect(component.closeUpdateCategoryModal).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should handle update category error', () => {
    component.selectedCategory = { id: 1, name: 'Category 1', categoryId: 1 };
    component.updateCategoryName = 'Updated Category';
    categoryManagementService.updateCategory.and.returnValue(throwError(() => new Error('error')));
    component.updateCategory();
    expect(categoryManagementService.updateCategory).toHaveBeenCalledWith(component.updateCategoryName, component.selectedCategory.categoryId);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre de categoria ya está en uso.', 'Modificar categoria');
  });

  it('CATEGORY MANAGEMENT - should close delete category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['hide']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: {
        getInstance: () => mockModalInstance
      }
    };

    component.closeDeleteCategoryModal();

    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should open delete category modal', () => {
    const mockModalInstance = jasmine.createSpyObj('modalInstance', ['show']);
    spyOn(document, 'getElementById').and.returnValue(document.createElement('div'));
    (window as any).bootstrap = {
      Modal: jasmine.createSpy().and.returnValue(mockModalInstance)
    };
    const category = { id: 1, name: 'Category 1' };

    component.openDeleteCategoryModal(category);

    expect(component.selectedCategory).toEqual(category);
    expect((window as any).bootstrap.Modal).toHaveBeenCalledWith(document.getElementById('deleteCategory'));
    expect(mockModalInstance.show).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should delete category successfully', () => {
    component.selectedCategory = { id: 1, name: 'Category 1', categoryId: 1 };
    categoryManagementService.getCategories.and.returnValue(of([]));
    categoryManagementService.deleteCategory.and.returnValue(of({}));
    spyOn(component, 'closeDeleteCategoryModal');

    component.deleteCategory();

    expect(categoryManagementService.deleteCategory).toHaveBeenCalledWith(1);
    expect(toastrService.success).toHaveBeenCalledWith('Categoria eliminada correctamente.', 'Eliminar categoria');
    expect(component.closeDeleteCategoryModal).toHaveBeenCalled();
  });

  it('CATEGORY MANAGEMENT - should handle delete category error', () => {
    component.selectedCategory = { id: 1, name: 'Category 1', categoryId: 1 };
    categoryManagementService.deleteCategory.and.returnValue(throwError(() => new Error('error')));

    component.deleteCategory();

    expect(categoryManagementService.deleteCategory).toHaveBeenCalledWith(1);
    expect(toastrService.error).toHaveBeenCalledWith('La categoría ya esta asociada a un producto.', 'Eliminar categoria');
  });

  it('CATEGORY MANAGEMENT - should show error message when category name is already in use', () => {
    component.createCategoryName = 'Existing Category';
    categoryManagementService.createCategory.and.returnValue(throwError(() => new Error('error')));
    component.createCategory();
    expect(toastrService.error).toHaveBeenCalledWith(
      'El nombre de categoria ya está en uso.',
      'Crear categoria'
    );
    expect(categoryManagementService.createCategory).toHaveBeenCalledWith('Existing Category');
  });

  it('CATEGORY MANAGEMENT - should show error message when updateCategoryName is empty', () => {
    component.updateCategoryName = '';
    component.selectedCategory = { id: 1, name: 'Category 1', categoryId: 1 };
    component.updateCategory();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Por favor, rellena todos los campos.',
      'Modificar categoria'
    );
    expect(categoryManagementService.updateCategory).not.toHaveBeenCalled();
  });
});
