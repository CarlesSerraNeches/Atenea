import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSubGrupComponent } from './expenses-sub-grup.component';

describe('ExpensesSubGrupComponent', () => {
  let component: ExpensesSubGrupComponent;
  let fixture: ComponentFixture<ExpensesSubGrupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSubGrupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSubGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
