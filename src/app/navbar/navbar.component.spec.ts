import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent tests', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, NavbarComponent],
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

    it('NAVBAR - should have correct navigation links', () => {
        const navLinks = fixture.debugElement.queryAll(By.css('.nav-link'));
        expect(navLinks.length).toBe(6);

        const expectedLinks = [
            { text: 'Home', icon: 'bi-house-fill', routerLink: 'home' },
            { text: 'Ayuda', icon: 'bi-question-circle-fill', routerLink: 'help' },
            { text: 'Contacto', icon: 'bi-telephone-fill', routerLink: 'contact' },
            { text: 'Sobre nosotros', icon: 'bi-info-circle-fill', routerLink: 'about' },
            { text: 'Login', icon: 'bi-key-fill', routerLink: '' },
            { text: 'Register', icon: 'bi-person-fill', routerLink: '' }
        ];

        navLinks.forEach((link, index) => {
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
});
