import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  public mensajeError(msg: string) {
    Swal.fire({
      title: 'Error',
      text: "¡" + msg + "!",
      icon: 'error',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) { }
    });
  }

  public mensajeConfirmacion(msg: string): Promise<boolean> {
    return Swal.fire({
      title: 'Confirmacion',
      text: msg,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: "No"
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  public mensajeInfo(msg: string[]) {
    Swal.fire({
      title: 'Contacto',
	  html: msg.join('<br>'),
      icon: 'info',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) { }
    });
  }
}
