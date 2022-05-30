import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorMaiYearGrupComponent } from './cor-mai-year-grup.component';

describe('CorMaiYearGrupComponent', () => {
  let component: CorMaiYearGrupComponent;
  let fixture: ComponentFixture<CorMaiYearGrupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorMaiYearGrupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorMaiYearGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
