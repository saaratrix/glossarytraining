import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PhrasesQuizSelectionComponent } from "./phrases-quiz-selection.component";

describe("PhrasesQuizSelectionComponent", () => {
  let component: PhrasesQuizSelectionComponent;
  let fixture: ComponentFixture<PhrasesQuizSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesQuizSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesQuizSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
