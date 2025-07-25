import { Component, OnInit } from '@angular/core';
import { TipoTarjetasService } from '../services/TipoTarjetas/tipo-tarjetas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajesService } from '../services/msg/mensajes.service';

@Component({
  selector: 'app-tipo-tarjetas',
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-tarjetas.component.html',
  styleUrl: './tipo-tarjetas.component.css',
  standalone: true
})
export class TipoTarjetasComponent implements OnInit {
  public option: number = 1
  public data: any[] = []
  public codigo: number | undefined
  public descripcion: string | undefined

  constructor(
    private tipoTarjetaService: TipoTarjetasService,
    private msgService: MensajesService
  ) { }

  ngOnInit(): void {
    this.tipoTarjetaService.getTipoTarjetas().subscribe(response => {
      this.data = response.data
    }, error => { })
  }

  public edit(element: any) {
    this.option = 2
    this.codigo = element.idTipo
    this.descripcion = element.nombreTipo
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Esta seguro que desea eliminar el registro con el codigo: " + id + "?")

    if (confirmacion) {
      this.tipoTarjetaService.eliminnarTipoTarjetas(id).subscribe(response => {
        if (response.status == "success") {
          this.data = this.data.filter(d => d.idTipo != id)
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
      this.tipoTarjetaService.saveTipoTarjetas({
        idTipo: this.codigo,
        nombreTipo: this.descripcion
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
      this.tipoTarjetaService.editTipoTarjetas({
        idTipo: this.codigo,
        nombreTipo: this.descripcion
      }).subscribe(response => {
        if (response.status == "success") {
          let element = this.data.find(d => d.idTipo == this.codigo)
          if (element) {
            element.nombreTipo = this.descripcion
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
