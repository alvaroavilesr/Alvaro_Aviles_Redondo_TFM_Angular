import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
import {ToastrService} from 'ngx-toastr';
import {UserManagementService} from './user-management.service';
import {ProfileService} from '../../profile/profile.service';

describe('User management tests', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let userManagementService: jasmine.SpyObj<UserManagementService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    const userManagementSpy = jasmine.createSpyObj('UserManagementService', ['login', 'getUsers', 'createUser', 'updateUserData', 'updateUserPassword', 'updateUserRole', 'deleteUser']);
    await TestBed.configureTestingModule({
      imports: [UserManagementComponent],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: UserManagementService, useValue: userManagementSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    userManagementService = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
  });

  it('USER MANAGEMENT - should create', () => {
    expect(component).toBeTruthy();
  });
});
