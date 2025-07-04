import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActionComponent } from './list-action.component';

describe('ListActionComponent', () => {
  let component: ListActionComponent;
  let fixture: ComponentFixture<ListActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
