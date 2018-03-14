import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbItemComponent } from './verb-item.component';

describe('VerbItemComponent', () => {
  let component: VerbItemComponent;
  let fixture: ComponentFixture<VerbItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
