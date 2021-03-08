import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PhrasesSelectionComponent } from "./phrases-selection.component";

describe("PhrasesSelectionComponent", () => {
  let component: PhrasesSelectionComponent;
  let fixture: ComponentFixture<PhrasesSelectionComponent>;

  beforeEach(waitForAsync(() => {
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
