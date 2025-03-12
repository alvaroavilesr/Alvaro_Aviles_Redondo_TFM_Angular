import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
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

  it('NAVBAR - should have correct main navigation links', () => {
    const mainNavLinks = fixture.debugElement.queryAll(By.css('.navbar-nav.me-auto .nav-link'));
    expect(mainNavLinks.length).toBe(4);

    const expectedLinks = [
      { text: 'Home', icon: 'bi-house-fill', routerLink: 'home' },
      { text: 'Ayuda', icon: 'bi-question-circle-fill', routerLink: 'help' },
      { text: 'Contacto', icon: 'bi-telephone-fill', routerLink: 'contact' },
      { text: 'Sobre nosotros', icon: 'bi-info-circle-fill', routerLink: 'about' }
    ];

    mainNavLinks.forEach((link, index) => {
      expect(link.nativeElement.textContent).toContain(expectedLinks[index].text);
      expect(link.query(By.css('i')).nativeElement.classList).toContain(expectedLinks[index].icon);
      expect(link.attributes['routerLink']).toBe(expectedLinks[index].routerLink);
    });
  });

  it('NAVBAR - should have a collapsible navbar', () => {
    const button = fixture.debugElement.query(By.css('.navbar-toggler'));
    expect(button).toBeTruthy();
    expect(button.attributes['data-bs-toggle']).toBe('collapse');
    expect(button.attributes['data-bs-target']).toBe('#navbarNav');
  });

  it('NAVBAR - should show login/register when user is not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();

    const notLoggedMenu = fixture.debugElement.query(By.css('#notLoggedMenu'));
    expect(notLoggedMenu).toBeTruthy();

    const loginLink = notLoggedMenu.query(By.css('li:first-child .nav-link'));
    const registerLink = notLoggedMenu.query(By.css('li:last-child .nav-link'));

    expect(loginLink.nativeElement.textContent).toContain('Login');
    expect(loginLink.query(By.css('i')).nativeElement.classList).toContain('bi-key-fill');
    expect(loginLink.attributes['routerLink']).toBe('login');

    expect(registerLink.nativeElement.textContent).toContain('Register');
    expect(registerLink.query(By.css('i')).nativeElement.classList).toContain('bi-person-fill');
    expect(registerLink.attributes['routerLink']).toBe('register');

    const loggedMenu = fixture.debugElement.query(By.css('#LoggedMenu'));
    expect(loggedMenu).toBeFalsy();
  });

  it('NAVBAR - should show logout when logged in', () => {
    authServiceSubject.next(true);
    fixture.detectChanges();

    const loggedMenu = fixture.debugElement.query(By.css('#LoggedMenu'));
    const notLoggedMenu = fixture.debugElement.query(By.css('#notLoggedMenu'));

    expect(loggedMenu).toBeTruthy();
    expect(notLoggedMenu).toBeFalsy();

    const logoutLink = loggedMenu.query(By.css('.nav-link'));
    expect(logoutLink.nativeElement.textContent).toContain('Logout');
    expect(logoutLink.query(By.css('i')).nativeElement.classList).toContain('bi-box-arrow-right');
    expect(logoutLink.attributes['style']).toContain('cursor: pointer');
  });

  it('NAVBAR - should call logout method on click', () => {
    authServiceSubject.next(true);
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('#LoggedMenu .nav-link'));
    logoutButton.triggerEventHandler('click', null);

    expect(authService.logout).toHaveBeenCalled();
  });

  it('NAVBAR - should initialize with correct login status from AuthService', () => {
    expect(component.isLoggedIn).toBe(false);
    authServiceSubject.next(true);
    expect(component.isLoggedIn).toBe(true);
  });

  it('NAVBAR - should unsubscribe from AuthService on component destroy', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('NAVBAR - should properly handle conditional display when login state changes', () => {
    let notLoggedMenu = fixture.debugElement.query(By.css('#notLoggedMenu'));
    let loggedMenu = fixture.debugElement.query(By.css('#LoggedMenu'));
    expect(notLoggedMenu).toBeTruthy();
    expect(loggedMenu).toBeFalsy();

    authServiceSubject.next(true);
    fixture.detectChanges();

    notLoggedMenu = fixture.debugElement.query(By.css('#notLoggedMenu'));
    loggedMenu = fixture.debugElement.query(By.css('#LoggedMenu'));
    expect(notLoggedMenu).toBeFalsy();
    expect(loggedMenu).toBeTruthy();

    authServiceSubject.next(false);
    fixture.detectChanges();

    notLoggedMenu = fixture.debugElement.query(By.css('#notLoggedMenu'));
    loggedMenu = fixture.debugElement.query(By.css('#LoggedMenu'));
    expect(notLoggedMenu).toBeTruthy();
    expect(loggedMenu).toBeFalsy();
  });
});
