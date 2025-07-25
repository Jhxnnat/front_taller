import { Component } from '@angular/core';
import { FranquiciaService } from '../services/franquicia/franquicia.service';
import { MensajesService } from '../services/msg/mensajes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-franquicia',
  imports: [CommonModule, FormsModule],
  templateUrl: './franquicia.component.html',
  styleUrl: './franquicia.component.css'
})
export class FranquiciaComponent {
  public option: number = 1
  public data: any[] = []
  public codigo: number | undefined
  public descripcion: string | undefined

  constructor(
    private franquiciaService: FranquiciaService,
    private msgService: MensajesService
  ) { }

  ngOnInit(): void {
    this.franquiciaService.getFranquicias().subscribe(response => {
      this.data = response.data
    }, error => { })
  }

  public edit(element: any) {
    this.option = 2
    this.codigo = element.codigoFranquicia
    this.descripcion = element.nombreFranquicia
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Esta seguro que desea eliminar el registro con el codigo: " + id + "?")

    if (confirmacion) {
      this.franquiciaService.eliminnarFranquicias(id).subscribe(response => {
        if (response.status == "success") {
          this.data = this.data.filter(d => d.codigoFranquicia != id)
        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
      })
    }
  }

  public save() {
    if (this.option == 1) { // Es un insertar
      this.franquiciaService.saveFranquicias({
        codigoFranquicia: this.codigo,
        nombreFranquicia: this.descripcion
      }).subscribe(response => {
        if (response.status == "success") {
          this.data.push(response.data)
          this.limpiar()
        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
      })
    } else { // Es un Actualizar
      this.franquiciaService.editFranquicias({
        codigoFranquicia: this.codigo,
        nombreFranquicia: this.descripcion
      }).subscribe(response => {
        if (response.status == "success") {
          let element = this.data.find(d => d.codigoFranquicia == this.codigo)
          if (element) {
            element.nombreFranquicia = this.descripcion
            this.limpiar()
          }
        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
      })
    }
    this.option = 1
  }

  public active(): boolean {
    return !(this.codigo != undefined && this.descripcion != undefined && this.descripcion != "")
  }

  private limpiar() {
    this.codigo = undefined
    this.descripcion = undefined
  }
}
