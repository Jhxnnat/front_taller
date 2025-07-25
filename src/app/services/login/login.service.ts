import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../models/login';
import { HttpService } from '../http/http.service';
import { LocalvariableService } from '../local/localvariable.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private service: HttpService, private local: LocalvariableService) { }

  public login(username: string, password: string): Observable<AuthResponse> {
    return this.service.httpAccesos(`/auth/login?username=${username}&password=${password}`, null);
  }

  public logout(username: string): Observable<AuthResponse> {
    return this.service.httpAccesos(`/auth/logout?username=${username}`, null)
  }
}
