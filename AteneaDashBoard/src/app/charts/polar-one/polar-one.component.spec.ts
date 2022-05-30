import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarOneComponent } from './polar-one.component';

describe('PolarOneComponent', () => {
  let component: PolarOneComponent;
  let fixture: ComponentFixture<PolarOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
