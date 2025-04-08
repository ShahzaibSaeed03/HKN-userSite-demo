import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandyEyeSliderComponent } from './kandy-eye-slider.component';

describe('KandyEyeSliderComponent', () => {
  let component: KandyEyeSliderComponent;
  let fixture: ComponentFixture<KandyEyeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KandyEyeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KandyEyeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
