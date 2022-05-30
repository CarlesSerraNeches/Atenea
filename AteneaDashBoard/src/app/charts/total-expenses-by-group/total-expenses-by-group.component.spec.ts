import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpensesByGroupComponent } from './total-expenses-by-group.component';

describe('TotalExpensesByGroupComponent', () => {
  let component: TotalExpensesByGroupComponent;
  let fixture: ComponentFixture<TotalExpensesByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalExpensesByGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalExpensesByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
