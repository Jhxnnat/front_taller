import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../models/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class FranquiciaService {

  constructor(
      private http: HttpService
    ) { }
  
    getFranquicias(): Observable<ResponseDTO>{
      return this.http.httpGet("/franquicias/listar");
    }
  
    saveFranquicias(element: any): Observable<ResponseDTO>{
      return this.http.httpPost("/franquicias/guardar",element);
    }
  
    editFranquicias(element: any): Observable<ResponseDTO>{
      return this.http.httpPut("/franquicias/actualizar/"+element.codigoFranquicia,element);
    }
  
    eliminnarFranquicias(id: number): Observable<ResponseDTO>{
      return this.http.httpDelete("/franquicias/eliminar/"+id);
    }
}
