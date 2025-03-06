import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HelpComponentComponent } from './help-component.component';

describe('HelpComponent tests', () => {
  let component: HelpComponentComponent;
  let fixture: ComponentFixture<HelpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('HELP - should create', () => {
    expect(component).toBeTruthy();
  });

  it('HELP - should have a container with the correct structure', () => {
    const container = fixture.debugElement.query(By.css('.container'));
    const rows = container.queryAll(By.css('.row'));
    expect(rows.length).toBe(1);
    expect(rows[0].queryAll(By.css('.col')).length).toBe(1);
  });

  it('HELP - should display the correct heading', () => {
    const heading = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toContain('Ayuda');
  });

  it('HELP - should display the correct help information', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(4);
    expect(paragraphs[0].nativeElement.textContent).toContain('Si necesitas ayuda');
    expect(paragraphs[1].nativeElement.textContent).toContain('Persona de contacto: Alvaro Avilés Redondo');
    expect(paragraphs[2].nativeElement.textContent).toContain('Email de contacto: alvaro.avilesr@alumnos.upm.es');
    expect(paragraphs[3].nativeElement.textContent).toContain('¡Trataremos de resolver cualquier problema lo antes posible!');
  });
});
