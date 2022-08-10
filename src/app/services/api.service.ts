import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { toBase64String } from '@angular/compiler/src/output/source_map';
/**
 * Class for Api Calls with methods GET, POST, PUT, DELETE
 *
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  /**
   * API BASE URL for calls with HttpClient
   *
   * @private
   * @memberof ApiService
   */
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { 
  }

  /**
   * Api call with method GET
   * 
   * @param endpoint endpoint to call
   * @param params Object with params to append to endpoint call
   * @returns promise with endpoint response
   */
  async get(endpoint: string, params?: any) {
    let httpParams = new HttpParams();
    const access_credentials = JSON.parse(sessionStorage.getItem('access_credentials'));
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${access_credentials.access_token}`,
      'Content-Type': `application/json`,
      'accept': 'application/json'
    });
    if (params) {
        for (const k in params) {
            if ((params as object).hasOwnProperty(k)) {
                httpParams = httpParams.append(k, params[k]);
            }
        }
    }
    return this.httpClient.get(
      `${this.baseUrl}${endpoint}`,
      {headers: headers, params: httpParams}
    ).toPromise();
  }

  /**
   * Api call with methos POST
   * 
   * @param endpoint endpoint to call
   * @param params Object with params to send with endpoint call
   * @returns promise with endpoint response
   */
  async post (endpoint, data) {
    const access_credentials = JSON.parse(sessionStorage.getItem('access_credentials'));
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${access_credentials.access_token}`,
      'Content-Type': `application/json`,
      'accept': 'application/json'
    });
    return this.httpClient.post(`${this.baseUrl}${endpoint}`, data, {headers}).toPromise();
  }
}
