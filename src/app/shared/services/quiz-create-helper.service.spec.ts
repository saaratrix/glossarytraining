import { TestBed, inject } from "@angular/core/testing";

import { QuizCreateHelperService } from "./quiz-create-helper.service";

describe("QuizCreateHelperService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizCreateHelperService]
    });
  });

  it("should be created", inject([QuizCreateHelperService], (service: QuizCreateHelperService) => {
    expect(service).toBeTruthy();
  }));
});
