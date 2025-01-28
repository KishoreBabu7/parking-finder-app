import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAnalysisComponent } from './monthly-analysis.component';

describe('MonthlyAnalysisComponent', () => {
  let component: MonthlyAnalysisComponent;
  let fixture: ComponentFixture<MonthlyAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
