import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasesDetailComponent } from './phrases-detail.component';

describe('PhrasesDetailComponent', () => {
  let component: PhrasesDetailComponent;
  let fixture: ComponentFixture<PhrasesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
