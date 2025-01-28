import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotIncomeComponent } from './spot-income.component';

describe('SpotIncomeComponent', () => {
  let component: SpotIncomeComponent;
  let fixture: ComponentFixture<SpotIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
