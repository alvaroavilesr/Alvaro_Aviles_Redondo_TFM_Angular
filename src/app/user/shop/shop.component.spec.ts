import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import {ToastrService} from 'ngx-toastr';
import {ShopService} from './shop.service';
import {ItemManagementService} from '../../vendor/item-management/item-management.service';

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
});
