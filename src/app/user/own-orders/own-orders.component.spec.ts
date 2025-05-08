import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnOrdersComponent } from './own-orders.component';

describe('OwnOrdersComponent', () => {
  let component: OwnOrdersComponent;
  let fixture: ComponentFixture<OwnOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
