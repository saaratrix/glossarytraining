import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VerbListComponent } from "./verb-list.component";

describe("VerbListComponent", () => {
  let component: VerbListComponent;
  let fixture: ComponentFixture<VerbListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
