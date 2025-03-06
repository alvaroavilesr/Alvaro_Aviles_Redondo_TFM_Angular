import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent tests', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('HOME - should create', () => {
    expect(component).toBeTruthy();
  });

  it('HOME - should have a container with correct rows and columns', () => {
    const container = fixture.debugElement.query(By.css('.container'));
    expect(container).toBeTruthy();

    const rows = container.queryAll(By.css('.row'));
    expect(rows.length).toBe(4);
    expect(rows[0].queryAll(By.css('.col')).length).toBe(2);
    expect(rows[1].queryAll(By.css('.col')).length).toBe(2);
    expect(rows[2].queryAll(By.css('.col')).length).toBe(1);
    expect(rows[3].queryAll(By.css('.col')).length).toBe(1);
  });

  it('HOME - should display proper heading text', () => {
    const headings = fixture.debugElement.queryAll(By.css('h2'));
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0].nativeElement.textContent).toContain('¿Quienes somos?');
  });

  it('HOME - should display correct paragraph text', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(3);
    expect(paragraphs[0].nativeElement.textContent).toContain('Somos una empresa de venta de ropa online');
    expect(paragraphs[1].nativeElement.textContent).toContain('Sobre nuestros productos');
    expect(paragraphs[2].nativeElement.textContent).toContain('De entre todas las razones por las que elegirnos');
  });

  it('HOME - should have a carousel with three items', () => {
    const carousel = fixture.debugElement.query(By.css('#carousel'));
    expect(carousel).toBeTruthy();

    const carouselItems = carousel.queryAll(By.css('.carousel-item'));
    expect(carouselItems.length).toBe(3);
  });

  it('HOME - should have correct images in the carousel', () => {
    const carousel = fixture.debugElement.query(By.css('#carousel'));
    const images = carousel.queryAll(By.css('img'));
    expect(images.length).toBe(3);
    expect(images[0].nativeElement.src).toContain('images/Camisetas.jpg');
    expect(images[1].nativeElement.src).toContain('images/Nature.jpg');
    expect(images[2].nativeElement.src).toContain('images/Sostenible.jpg');
  });
});
