import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "../../../environments/environment";


@Injectable()
export class ApiService {

  constructor (private httpClient: HttpClient) { }

  public get<T = any>(url: string, parameters: HttpParams = new HttpParams()): Promise<T> {
    const apiUrl: string = environment.api_url + url;

    const promise = new Promise<any>(res => {
      this.httpClient.get(apiUrl, {
      headers: this.getRequestHeaders(),
      params: parameters
      }).subscribe((result: any) => {
        res(result);
      },
      (error: HttpErrorResponse) => {
        res({
          error: error.message
        });
      });
    });

    return promise;
  }

  public post<T = any>(url: string, parameters: Record<string, any>): Promise<T> {
    const apiUrl: string = environment.api_url + url;

    const promise = new Promise<any>(res => {
      this.httpClient.post(apiUrl, JSON.stringify(parameters), {
        headers: this.getRequestHeaders()
      }).subscribe((result: any) => {
        res(result);
      },
      (error: HttpErrorResponse) => {
        res({
          error: error.message
        });
      });
    });

    return promise;
  }

  private getRequestHeaders (): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
  }

}
