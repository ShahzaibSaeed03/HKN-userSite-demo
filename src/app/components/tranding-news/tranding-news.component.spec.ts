import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrandingNewsComponent } from './tranding-news.component';

describe('TrandingNewsComponent', () => {
  let component: TrandingNewsComponent;
  let fixture: ComponentFixture<TrandingNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrandingNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrandingNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
