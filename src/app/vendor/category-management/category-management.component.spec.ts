import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagementComponent } from './category-management.component';

describe('VendorHomeComponent tests', () => {
  let component: CategoryManagementComponent;
  let fixture: ComponentFixture<CategoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('VENDOR HOME - should create', () => {
    expect(component).toBeTruthy();
  });
});
