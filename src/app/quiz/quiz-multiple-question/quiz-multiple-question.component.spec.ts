import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMultipleQuestionComponent } from './quiz-multiple-question.component';

describe('QuizMultipleQuestionComponent', () => {
  let component: QuizMultipleQuestionComponent;
  let fixture: ComponentFixture<QuizMultipleQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMultipleQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMultipleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
