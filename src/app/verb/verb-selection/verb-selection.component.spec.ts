import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VerbSelectionComponent } from "./verb-selection.component";

describe("VerbSelectionComponent", () => {
  let component: VerbSelectionComponent;
  let fixture: ComponentFixture<VerbSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
