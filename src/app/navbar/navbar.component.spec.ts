import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('NavbarComponent tests', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let authServiceSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    authServiceSubject = new BehaviorSubject<boolean>(false);
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    authService.isLoggedIn$ = authServiceSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]), // Modern replacement for RouterTestingModule
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

  it('NAVBAR - should have a navbar with correct classes', () => {
    const navbar = fixture.debugElement.query(By.css('nav'));
    expect(navbar).toBeTruthy();
    expect(navbar.nativeElement.classList).toContain('navbar');
    expect(navbar.nativeElement.classList).toContain('navbar-expand-lg');
    expect(navbar.nativeElement.classList).toContain('navbar-dark');
    expect(navbar.nativeElement.classList).toContain('bg-dark');
  });

  it('NAVBAR - should have a brand link with correct text', () => {
    const brand = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(brand).toBeTruthy();
    expect(brand.nativeElement.textContent).toContain('The Clothing Hub');
  });

  it('NAVBAR - should have a collapsible navbar', () => {
    const button = fixture.debugElement.query(By.css('.navbar-toggler'));
    expect(button).toBeTruthy();
    expect(button.attributes['data-bs-toggle']).toBe('collapse');
    expect(button.attributes['data-bs-target']).toBe('#navbarNav');
  });
});
