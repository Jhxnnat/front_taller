import { Injectable } from '@angular/core';
import { LocalvariableService } from '../local/localvariable.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private local: LocalvariableService) { }

  getToken(): string | null{
    return this.local.getToken()
  }

  getDecodedToken(): any | null{
    const token = this.getToken()
    if(!token)return null;

    try{
      return jwtDecode(token)
    }catch(error){
      return null
    }
  }
}
