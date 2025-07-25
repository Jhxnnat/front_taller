import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private http: HttpService
  ) { }

  getServicios(): Observable<ResponseDTO> {
    return this.http.httpGet("/servicio/listar");
  }

  getServiciosVehiculos(id: number): Observable<ResponseDTO> {
    return this.http.httpGet("/servicio/consultar_vehiculo/" + id);
  }

  saveServicios(element: any): Observable<ResponseDTO> {
    return this.http.httpPost("/servicio/agregar", element);
  }

  editServicios(element: any): Observable<ResponseDTO> {
    return this.http.httpPut("/servicio/actualizar/" + element.idServicio, element);
  }

  eliminarServicios(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/servicio/eliminar/" + id);
  }
}
