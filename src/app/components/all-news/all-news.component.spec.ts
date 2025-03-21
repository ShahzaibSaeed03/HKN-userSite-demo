import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsComponent } from './all-news.component';

describe('AllNewsComponent', () => {
  let component: AllNewsComponent;
  let fixture: ComponentFixture<AllNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
