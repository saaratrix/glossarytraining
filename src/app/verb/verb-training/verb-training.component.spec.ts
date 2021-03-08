import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VerbTrainingComponent } from "./verb-training.component";

describe("VerbTrainingComponent", () => {
  let component: VerbTrainingComponent;
  let fixture: ComponentFixture<VerbTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
