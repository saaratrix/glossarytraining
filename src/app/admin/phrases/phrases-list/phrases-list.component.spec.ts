import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PhrasesListComponent } from "./phrases-list.component";

describe("PhrasesListComponent", () => {
  let component: PhrasesListComponent;
  let fixture: ComponentFixture<PhrasesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhrasesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhrasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
