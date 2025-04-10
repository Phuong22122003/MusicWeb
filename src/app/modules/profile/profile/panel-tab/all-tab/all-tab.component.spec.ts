import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTabComponent } from './all-tab.component';

describe('AllTabComponent', () => {
  let component: AllTabComponent;
  let fixture: ComponentFixture<AllTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
