import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ProfileComponent tests', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);
    const profileSpy = jasmine.createSpyObj('ProfileService', ['login', 'updateUserData']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CommonModule, ProfileComponent],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: ProfileService, useValue: profileSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
  });

  it('should create the profile component', () => {
    expect(component).toBeTruthy();
  });
});
