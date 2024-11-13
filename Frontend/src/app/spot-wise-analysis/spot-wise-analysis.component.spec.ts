import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotWiseAnalysisComponent } from './spot-wise-analysis.component';

describe('SpotWiseAnalysisComponent', () => {
  let component: SpotWiseAnalysisComponent;
  let fixture: ComponentFixture<SpotWiseAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotWiseAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotWiseAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
