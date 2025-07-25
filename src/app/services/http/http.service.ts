import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalvariableService } from '../local/localvariable.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Variables
  private apiUrl: string = "http://localhost:8000";

  constructor(private http: HttpClient, private variable: LocalvariableService) { }

  private getHeader(): HttpHeaders {
    const token = this.variable.getToken()

    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    })

    if (token) {
      headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      })
    }

    return headers
  }

  public httpAccesos(url: string, element: any): Observable<any> {
    return this.http.post(this.apiUrl + url, element)
  }

  public httpPost(url: string, element: any): Observable<any> {
    return this.http.post(this.apiUrl + url, element,{
      headers: this.getHeader()
    })
  }

  public httpGet(url: string): Observable<any> {
    return this.http.get(this.apiUrl + url,{
      headers: this.getHeader()
    })
  }

  public httpDelete(url: string): Observable<any> {
    return this.http.delete(this.apiUrl + url,{
      headers: this.getHeader()
    })
  }

  public httpPut(url: string, element: any): Observable<any> {
    return this.http.put(this.apiUrl + url, element,{
      headers: this.getHeader()
    })
  }

  public httpPatch(url: string, element: any): Observable<any> {
    return this.http.patch(this.apiUrl + url, element,{
      headers: this.getHeader()
    })
  }
}
