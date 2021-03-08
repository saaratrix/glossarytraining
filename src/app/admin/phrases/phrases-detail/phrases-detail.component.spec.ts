import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PhrasesDetailComponent } from "./phrases-detail.component";

describe("PhrasesDetailComponent", () => {
  let component: PhrasesDetailComponent;
  let fixture: ComponentFixture<PhrasesDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
