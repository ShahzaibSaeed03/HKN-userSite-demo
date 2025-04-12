import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebirtyComponent } from './celebirty.component';

describe('CelebirtyComponent', () => {
  let component: CelebirtyComponent;
  let fixture: ComponentFixture<CelebirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelebirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
