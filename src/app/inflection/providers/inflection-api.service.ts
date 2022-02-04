import { Injectable } from '@angular/core';
import { InflectionGetResponse } from '../../shared/models/http/httpresponses';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class InflectionApiService {

  constructor(
    private apiService: ApiService,
  ) { }

  async getInflectionsForCategory(id: number): Promise<InflectionGetResponse> {
    return await this.apiService.get(`inflection/inflection-category/${id}`);
  }
}
