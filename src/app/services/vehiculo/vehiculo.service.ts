import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private http: HttpService
  ) { }

  getVehiculos(): Observable<ResponseDTO> {
    return this.http.httpGet("/vehiculo/listar");
  }

  getVehiculosClientes(id: number): Observable<ResponseDTO> {
    return this.http.httpGet("/vehiculo/consultar_cliente/" + id);
  }

  saveVehiculos(element: any): Observable<ResponseDTO> {
    return this.http.httpPost("/vehiculo/agregar", element);
  }

  editVehiculos(element: any): Observable<ResponseDTO> {
    return this.http.httpPut("/vehiculo/actualizar/" + element.idVehiculo, element);
  }

  eliminarVehiculos(id: number): Observable<ResponseDTO> {
    return this.http.httpDelete("/vehiculo/eliminar/" + id);
  }
}
