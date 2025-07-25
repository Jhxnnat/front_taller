import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {

  constructor(
     private http: HttpService
   ) { }
 
   getTarjetas(): Observable<ResponseDTO> {
     return this.http.httpGet("/tarjetas/listar");
   }
 
   saveTarjetas(element: any): Observable<ResponseDTO> {
     return this.http.httpPost("/tarjetas/guardar", element);
   }
 
   editTarjetas(element: any): Observable<ResponseDTO> {
     return this.http.httpPut("/tarjetas/actualizar/" + element.codigoFranquicia, element);
   }
 
   eliminnarTarjetas(id: number): Observable<ResponseDTO> {
     return this.http.httpDelete("/tarjetas/eliminar/" + id);
   }
}
