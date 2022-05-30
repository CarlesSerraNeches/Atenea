import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpensesByYearComponent } from './total-expenses-by-year.component';

describe('TotalExpensesByYearComponent', () => {
  let component: TotalExpensesByYearComponent;
  let fixture: ComponentFixture<TotalExpensesByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalExpensesByYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalExpensesByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
