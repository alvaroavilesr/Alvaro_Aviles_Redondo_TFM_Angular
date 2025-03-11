import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent tests', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('USER HOME - should create', () => {
    expect(component).toBeTruthy();
  });
});
