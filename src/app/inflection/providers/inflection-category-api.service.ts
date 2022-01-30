import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import type { InflectionCategoryGetResponse } from '../../shared/models/http/httpresponses';

@Injectable({
  providedIn: 'root'
})
export class InflectionCategoryApiService {

  constructor(
    private apiService: ApiService,
  ) { }

  async getInflectionCategoriesWithInflections(): Promise<InflectionCategoryGetResponse> {
    return await this.apiService.get<InflectionCategoryGetResponse>("inflection-category/with-inflections");
  }
}
