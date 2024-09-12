import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingComponent } from './parking.component';

describe('ParkingComponent', () => {
  let component: ParkingComponent;
  let fixture: ComponentFixture<ParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
