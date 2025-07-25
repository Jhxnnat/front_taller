import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(
    private http: HttpService
  ) { }

  getPersonas(): Observable<ResponseDTO> {
    return this.http.httpGet("/personas/listar");
  }

  savePersonas(element: any): Observable<ResponseDTO> {
    return this.http.httpPost("/personas/guardar", element);
  }

  editPersonas(element: any): Observable<ResponseDTO> {
    return this.http.httpPut("/personas/actualizar/" + element.codigoFranquicia, element);
  }

  eliminnarPersonas(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/personas/eliminar/" + id);
  }
}
