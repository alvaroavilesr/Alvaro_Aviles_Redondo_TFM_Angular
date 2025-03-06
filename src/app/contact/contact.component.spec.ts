import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';

describe('ContactComponent tests', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CONTACT - should create', () => {
    expect(component).toBeTruthy();
  });

  it('CONTACT - should have a container with the correct structure', () => {
    const container = fixture.debugElement.query(By.css('.container'));
    const rows = container.queryAll(By.css('.row'));
    expect(rows.length).toBe(1);
    expect(rows[0].queryAll(By.css('.col')).length).toBe(1);
  });

  it('CONTACT - should display the correct heading', () => {
    const heading = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toContain('Contacto');
  });

  it('CONTACT - should display the correct contact information', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(4);
    expect(paragraphs[0].nativeElement.textContent).toContain('Si tienes sugerencias');
    expect(paragraphs[1].nativeElement.textContent).toContain('Persona de contacto: Alvaro Avilés Redondo');
    expect(paragraphs[2].nativeElement.textContent).toContain('Email de contacto: alvaro.avilesr@alumnos.upm.es');
    expect(paragraphs[3].nativeElement.textContent).toContain('¡Estaremos encantados de ayudarte en todo lo que podamos!');
  });
});
