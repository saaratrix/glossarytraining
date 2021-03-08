import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ItemToggleSelectorComponent } from "./item-toggle-selector.component";

describe("ItemToggleSelectorComponent", () => {
  let component: ItemToggleSelectorComponent;
  let fixture: ComponentFixture<ItemToggleSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemToggleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToggleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
