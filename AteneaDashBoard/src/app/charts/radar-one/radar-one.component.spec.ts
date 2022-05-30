import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarOneComponent } from './radar-one.component';

describe('RadarOneComponent', () => {
  let component: RadarOneComponent;
  let fixture: ComponentFixture<RadarOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
