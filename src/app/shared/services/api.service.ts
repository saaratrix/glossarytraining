import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public get(a_url: string, a_parameters: HttpParams = new HttpParams()): Promise<any> {
    const apiUrl: string = environment.api_url + a_url;

    const promise = new Promise<any>(res => {
      this.httpClient.get(apiUrl, {
      headers: this.getRequestHeaders(),
      params: a_parameters
      }).subscribe((result: any) => {
        console.log("api get", result);
        res(result);
      });
    });

    return promise;
  }

  public post(a_url: string, a_parameters: any = {}): Promise<any> {
    const apiUrl: string = environment.api_url + a_url;

    const promise = new Promise<any>(res => {
      this.httpClient.post(apiUrl, JSON.stringify(a_parameters), {
        headers: this.getRequestHeaders()
      }).subscribe((result: any) => {
        console.log("api post", result);
        res(result);
      });
    })

    return promise;
  }

  private getRequestHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
  }

}
