import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class MecanicoService {

  constructor(
    private http: HttpService
  ) { }

  getMecanicos(): Observable<ResponseDTO> {
    return this.http.httpGet("/mecanico/listar");
  }

  saveMecanicos(element: any): Observable<ResponseDTO> {
    return this.http.httpPost("/mecanico/agregar", element);
  }

  editMecanicos(element: any): Observable<ResponseDTO> {
    return this.http.httpPut("/mecanico/actualizar/" + element.idMecanico, element);
  }

  eliminarMecanicos(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/mecanico/eliminar/" + id);
  }

}
