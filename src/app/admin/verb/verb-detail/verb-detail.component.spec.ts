import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VerbDetailComponent } from "./verb-detail.component";

describe("VerbDetailComponent", () => {
  let component: VerbDetailComponent;
  let fixture: ComponentFixture<VerbDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
