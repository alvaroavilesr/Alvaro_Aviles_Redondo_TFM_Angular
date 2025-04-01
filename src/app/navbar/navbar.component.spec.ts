import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/services/auth.service';
import {BehaviorSubject, of} from 'rxjs';

describe('NavbarComponent tests', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let authServiceSubject: BehaviorSubject<boolean>;
  let userRoleSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    authServiceSubject = new BehaviorSubject<boolean>(false);
    userRoleSubject = new BehaviorSubject<string>('Guest');
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    authService.isLoggedIn$ = authServiceSubject.asObservable();
    authService.userRole$ = userRoleSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NAVBAR - should create', () => {
    expect(component).toBeTruthy();
  });

  it('NAVBAR - should show user-specific menu based on role', () => {
    authServiceSubject.next(true);
    userRoleSubject.next('User');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("[routerLink='user-home']"))).toBeTruthy();

    userRoleSubject.next('Vendor');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("[routerLink='user-home']"))).toBeTruthy();

    userRoleSubject.next('Admin');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("[routerLink='user-management']"))).toBeTruthy();
  });

  it('NAVBAR - should show correct links when logged in', () => {
    authServiceSubject.next(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#LoggedMenu"))).toBeTruthy();
    expect(fixture.debugElement.query(By.css("#notLoggedMenu"))).toBeFalsy();
  });

  it('NAVBAR - should show login/register when logged out', () => {
    authServiceSubject.next(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#notLoggedMenu"))).toBeTruthy();
    expect(fixture.debugElement.query(By.css("#LoggedMenu"))).toBeFalsy();
  });

  it('NAVBAR - should unsubscribe from AuthService on destroy', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });
});
