import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorHomeComponent } from './vendor-home.component';

describe('VendorHomeComponent tests', () => {
  let component: VendorHomeComponent;
  let fixture: ComponentFixture<VendorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('VENDOR HOME - should create', () => {
    expect(component).toBeTruthy();
  });
});
