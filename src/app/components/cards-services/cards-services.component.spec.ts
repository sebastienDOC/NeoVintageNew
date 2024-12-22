import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsServicesComponent } from './cards-services.component';

describe('CardsServicesComponent', () => {
  let component: CardsServicesComponent;
  let fixture: ComponentFixture<CardsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
