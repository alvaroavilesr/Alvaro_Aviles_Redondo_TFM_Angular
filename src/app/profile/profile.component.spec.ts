import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from './profile.service';

describe('ProfileComponent tests', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const profileSpy = jasmine.createSpyObj('ProfileService', ['login', 'updateUserData']);

    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('PROFILE - should create', () => {
    expect(component).toBeTruthy();
  });
});
