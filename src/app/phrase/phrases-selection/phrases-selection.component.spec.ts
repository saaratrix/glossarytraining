import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasesSelectionComponent } from './phrases-selection.component';

describe('PhrasesSelectionComponent', () => {
  let component: PhrasesSelectionComponent;
  let fixture: ComponentFixture<PhrasesSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
