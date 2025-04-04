import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryManagementComponent } from './category-management.component';
import {ToastrService} from 'ngx-toastr';
import {CategoryManagementService} from './category-management.service';

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
});
