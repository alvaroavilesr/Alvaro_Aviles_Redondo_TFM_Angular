import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { ApiService } from '../shared/services/api.service';
import { of } from 'rxjs';
import { Login } from '../shared/models/login.model';

describe('ProfileService tests', () => {
  let profileService: ProfileService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['login', 'updateUserDataProfile']);

    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });

    profileService = TestBed.inject(ProfileService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('PROFILE SERVICE - should be created', () => {
    expect(profileService).toBeTruthy();
  });

  it('PROFILE SERVICE - should call ApiService login method with correct data', () => {
    const mockLoginModel: Login = {
      username: 'testUser',
      password: 'testPassword'
    };

    const expectedResponse = { body: { jwtToken: 'token' } };
    apiServiceSpy.login.and.returnValue(of(expectedResponse));

    let result: any;
    profileService.login(mockLoginModel).subscribe(response => {
      result = response;
    });

    expect(apiServiceSpy.login).toHaveBeenCalledWith(mockLoginModel);
    expect(result).toEqual(expectedResponse);
  });

  it('PROFILE SERVICE - should call ApiService updateUserData method with correct data', () => {
    const field = 'UserEmail';
    const newValue = 'newemail@example.com';

    const expectedResponse = { success: true };
    apiServiceSpy.updateUserDataProfile.and.returnValue(of(expectedResponse));

    let result: any;
    profileService.updateUserData(field, newValue).subscribe(response => {
      result = response;
    });

    expect(apiServiceSpy.updateUserDataProfile).toHaveBeenCalledWith(field, newValue);
    expect(result).toEqual(expectedResponse);
  });
});
