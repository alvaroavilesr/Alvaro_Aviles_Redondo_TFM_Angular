import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AboutComponent } from './about.component';

describe('AboutComponent tests', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AboutComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ABOUT - should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ABOUT - should contain the title "Sobre nosotros"', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).toContain('Sobre nosotros');
  });

  it('ABOUT - should display the first paragraph text correctly', () => {
    const firstParagraph = fixture.debugElement.query(By.css('p.fs-4'));
    expect(firstParagraph.nativeElement.textContent).toContain('Somos una empresa de reciente incorporación');
  });

  it('ABOUT - should display the images with correct sources', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(2);
    expect(images[0].nativeElement.src).toContain('images/Sostenible.jpg');
    expect(images[1].nativeElement.src).toContain('images/Moda.jpg');
  });

  it('ABOUT - should have the correct classes on the images', () => {
    const images = fixture.nativeElement.querySelectorAll('img');
    images.forEach((image: HTMLImageElement) => {
      expect(image.classList).toContain('img-fluid');
      expect(image.classList).toContain('border');
      expect(image.classList).toContain('border-secondary');
      expect(image.classList).toContain('border-2');
      expect(image.classList).toContain('w-75');
    });
  });
});
