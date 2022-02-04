import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import type { InflectionSelection } from './inflection-selection.model';
import type { InflectionCategory } from '../../../shared/models/inflection-category';
import { InflectionCategoryApiService } from '../../providers/inflection-category-api.service';
import type { ItemToggledEvent } from '../../../shared/components/item-toggle-selector/item-toggle-selector.component';
import { InflectionApiService } from '../../providers/inflection-api.service';
import type { Inflection } from '../../../shared/models/inflection';
import type { InflectionGetResponse } from '../../../shared/models/http/httpresponses';

@Component({
  selector: 'inflection-chooser',
  templateUrl: './inflections-chooser.component.html',
  styleUrls: ['./inflections-chooser.component.less']
})
export class InflectionsChooserComponent implements OnInit {
  @Output() selected: EventEmitter<InflectionSelection | undefined> = new EventEmitter<InflectionSelection | undefined>();

  inflectionCategories: InflectionCategory[] = [];
  error: string = '';
  hasLoaded: boolean = false;

  private selectedInflectionCategory: InflectionCategory | undefined;
  private loadedInflectionsForCategory: Map<InflectionCategory, Inflection[]> = new Map<InflectionCategory, Inflection[]>();

  private currentInflectionPromises: Map<InflectionCategory, Promise<InflectionGetResponse>> = new Map<InflectionCategory, Promise<InflectionGetResponse>>();

  constructor(
    private inflectionCategoryApiService: InflectionCategoryApiService,
    private inflectionApiService: InflectionApiService,
  ) { }

  async ngOnInit(): Promise<void> {
    const response = await this.inflectionCategoryApiService.getInflectionCategoriesWithInflections();
    this.hasLoaded = true;
    if (response.error) {
      this.error = response.error;
      return;
    } else if (response.inflectionCategories.length === 0) {
      this.error = 'no inflections found';
    }

    this.inflectionCategories = response.inflectionCategories;
  }

  async onItemClicked(event: ItemToggledEvent<InflectionCategory>): Promise<void> {
    if (!event.selected) {
      this.selectedInflectionCategory = undefined;
      this.selected.emit(undefined);
      return;
    }

    const inflectionCategory = event.item;
    this.selectedInflectionCategory = event.selected ? inflectionCategory : undefined;

    if (this.currentInflectionPromises.has(inflectionCategory)) {
      return;
    }

    const inflections = await this.getInflectionsForCategory(inflectionCategory);
    if (this.selectedInflectionCategory !== inflectionCategory) {
      return;
    }

    this.selected.emit({
      inflectionCategory,
      inflections,
    });
  }

  getInflectionsForCategory(inflectionCategory: InflectionCategory): Promise<Inflection[]> {
    return new Promise(async (res): Promise<void> => {
      if (this.loadedInflectionsForCategory.has(inflectionCategory)) {
        res(this.loadedInflectionsForCategory.get(inflectionCategory));
        return;
      }

      if (this.currentInflectionPromises.has(inflectionCategory)) {
        return;
      }

      let promise = this.inflectionApiService.getInflectionsForCategory(inflectionCategory.id);
      this.currentInflectionPromises.set(inflectionCategory, promise);

      const response = await promise;
      this.loadedInflectionsForCategory.set(inflectionCategory, response.inflections);
      this.currentInflectionPromises.delete(inflectionCategory);
      res(response.inflections);
    });
  }
}
