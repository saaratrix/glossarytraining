import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VerbItemComponent } from "./verb-item.component";

describe("VerbItemComponent", () => {
  let component: VerbItemComponent;
  let fixture: ComponentFixture<VerbItemComponent>;

  beforeEach(waitForAsync(() => {
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
