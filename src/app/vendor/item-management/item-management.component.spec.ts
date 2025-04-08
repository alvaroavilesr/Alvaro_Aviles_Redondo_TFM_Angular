import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementComponent } from './item-management.component';;
import {ToastrService} from 'ngx-toastr';
import {ItemManagementService} from './item-management.service';
import {UserManagementService} from '../../admin/user-management/user-management.service';

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
      'deleteItem'
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
