import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  constructor(
    private http: HttpService
  ) { }

  getBancos(): Observable<ResponseDTO> {
    return this.http.httpGet("/bancos/listar");
  }

  saveBancos(element: any): Observable<ResponseDTO> {
    return this.http.httpPost("/bancos/guardar", element);
  }

  editBancos(element: any): Observable<ResponseDTO> {
    return this.http.httpPut("/bancos/actualizar/" + element.codigoFranquicia, element);
  }

  eliminnarBancos(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/bancos/eliminar/" + id);
  }
}
