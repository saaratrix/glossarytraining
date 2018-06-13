import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemToggleSelectorComponent } from "./item-toggle-selector.component";

describe("ItemToggleSelectorComponent", () => {
  let component: ItemToggleSelectorComponent;
  let fixture: ComponentFixture<ItemToggleSelectorComponent>;

  beforeEach(async(() => {
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
