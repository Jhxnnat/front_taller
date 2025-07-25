import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class TipoTarjetasService {

  constructor(
    private http: HttpService
  ) { }

  getTipoTarjetas(): Observable<ResponseDTO>{
    return this.http.httpGet("/tipostarjetas/listar");
  }

  saveTipoTarjetas(element: any): Observable<ResponseDTO>{
    return this.http.httpPost("/tipostarjetas/guardar",element);
  }

  editTipoTarjetas(element: any): Observable<ResponseDTO>{
    return this.http.httpPut("/tipostarjetas/actualizar/"+element.idTipo,element);
  }

  eliminnarTipoTarjetas(id: number): Observable<ResponseDTO>{
    return this.http.httpDelete("/tipostarjetas/eliminar/"+id);
  }
}
