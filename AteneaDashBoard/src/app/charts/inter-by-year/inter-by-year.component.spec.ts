import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterByYearComponent } from './inter-by-year.component';

describe('InterByYearComponent', () => {
  let component: InterByYearComponent;
  let fixture: ComponentFixture<InterByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterByYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
