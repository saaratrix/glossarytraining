import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { QuizDetailComponent } from "./quiz-detail.component";

describe("QuizDetailComponent", () => {
  let component: QuizDetailComponent;
  let fixture: ComponentFixture<QuizDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
