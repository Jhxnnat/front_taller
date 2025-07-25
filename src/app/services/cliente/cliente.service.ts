import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpService
  ) { }

  getClientes(): Observable<ResponseDTO> {
    return this.http.httpGet("/clientes/listar");
  }

  saveClientes(element: any): Observable<ResponseDTO> {
    return this.http.httpPost("/clientes/agregar", element);
  }

  editClientes(element: any): Observable<ResponseDTO> {
    return this.http.httpPut("/clientes/actualizar/" + element.idCliente, element);
  }

  eliminarClientes(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/clientes/eliminar/" + id);
  }

  eliminarClientesCompleto(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/clientes/eliminar_completo/" + id);
  }

}
