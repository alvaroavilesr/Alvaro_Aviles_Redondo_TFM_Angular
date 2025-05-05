import { TestBed } from '@angular/core/testing';
import { ShopService } from './shop.service';
import { ApiService } from '../../shared/services/api.service';
import { of } from 'rxjs';

describe('ShopService Tests', () => {
  let shopService: ShopService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getItems', 'getCategories']);

    TestBed.configureTestingModule({
      providers: [
        ShopService,
        { provide: ApiService, useValue: spy }
      ]
    });

    shopService = TestBed.inject(ShopService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('SHOP SERVICE - debería crearse correctamente', () => {
    expect(shopService).toBeTruthy();
  });

  it('SHOP SERVICE - getItems debería llamar a apiService.getItems', () => {
    const mockItems = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    apiServiceSpy.getItems.and.returnValue(of(mockItems));
    let result: any;
    shopService.getItems().subscribe(items => {
      result = items;
    });

    expect(apiServiceSpy.getItems).toHaveBeenCalled();
    expect(result).toEqual(mockItems);
  });

  it('SHOP SERVICE - getCategories debería llamar a apiService.getCategories', () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
    apiServiceSpy.getCategories.and.returnValue(of(mockCategories));
    let result: any;
    shopService.getCategories().subscribe(categories => {
      result = categories;
    });

    expect(apiServiceSpy.getCategories).toHaveBeenCalled();
    expect(result).toEqual(mockCategories);
  });
});
