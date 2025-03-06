import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {By} from '@angular/platform-browser';

describe('FooterComponent tests', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('FOOTER - should create', () => {
    expect(component).toBeTruthy();
  });

  it('FOOTER - should display the correct text', () => {
    const text = fixture.debugElement.queryAll(By.css('p'));
    expect(text.length).toBe(1);
    expect(text[0].nativeElement.textContent).toContain('© 2025 The Clothing Hub, Inc');
  });
});
