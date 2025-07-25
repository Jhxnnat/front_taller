import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalvariableService {

  constructor() { }

  public setToken(element: string){
    localStorage.setItem("token",element)
  }

  public getToken(): string {
    return localStorage.getItem("token") ?? "";
  }
  
  public setRefreshToken(element: string){
    localStorage.setItem("refreshToken",element)
  }

  public getRefreshToken(): string {
    return localStorage.getItem("refreshToken") ?? "";
  }

  public setUser(element: string){
    localStorage.setItem("user",element)
  }

  public getUser(): string {
    return localStorage.getItem("user") ?? "";
  }
}
