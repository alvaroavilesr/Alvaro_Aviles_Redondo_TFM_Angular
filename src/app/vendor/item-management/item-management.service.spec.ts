import { TestBed } from '@angular/core/testing';
import { ItemManagementService } from './item-management.service';
import { ApiService } from '../../shared/services/api.service';
import { of } from 'rxjs';

describe('ItemManagementService tests', () => {
  let service: ItemManagementService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getItems',
      'getCategories',
      'createItem',
      'deleteItem',
      'updateItem',
      'updateItemCategory'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ItemManagementService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(ItemManagementService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('ITEM MANAGEMENT SERVICE - should call getItems from ApiService', () => {
    const mockItems = [{ id: 1, name: 'Item 1' }];
    apiService.getItems.and.returnValue(of(mockItems));

    service.getItems().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    expect(apiService.getItems).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT SERVICE - should call getCategories from ApiService', () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }];
    apiService.getCategories.and.returnValue(of(mockCategories));

    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    expect(apiService.getCategories).toHaveBeenCalled();
  });

  it('ITEM MANAGEMENT SERVICE - should call createItem from ApiService', () => {
    const createItemModel = { name: 'New Item' };
    const createItemCategory = 'Category1';
    const mockResponse = { id: 1, name: 'New Item' };
    apiService.createItem.and.returnValue(of(mockResponse));

    service.createItem(createItemModel, createItemCategory).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.createItem).toHaveBeenCalledWith(createItemModel, createItemCategory);
  });

  it('ITEM MANAGEMENT SERVICE - should call deleteItem from ApiService', () => {
    const itemId = 1;
    const mockResponse = { message: 'Item deleted successfully' };
    apiService.deleteItem.and.returnValue(of(mockResponse));

    service.deleteItem(itemId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.deleteItem).toHaveBeenCalledWith(itemId);
  });

  it('ITEM MANAGEMENT SERVICE - should call updateItem from ApiService', () => {
    const updatedItem = { id: 1, name: 'Updated Item' };
    const mockResponse = { message: 'Item updated successfully' };
    apiService.updateItem.and.returnValue(of(mockResponse));

    service.updateItem(updatedItem).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.updateItem).toHaveBeenCalledWith(updatedItem);
  });

  it('ITEM MANAGEMENT SERVICE - should call updateItemCategory from ApiService', () => {
    const itemId = 1;
    const updatedCategory = 'NewCategory';
    const mockResponse = { message: 'Item category updated successfully' };
    apiService.updateItemCategory.and.returnValue(of(mockResponse));

    service.updateItemCategory(itemId, updatedCategory).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(apiService.updateItemCategory).toHaveBeenCalledWith(itemId, updatedCategory);
  });
});
