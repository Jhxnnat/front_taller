import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../services/cliente/cliente.service';
import { MensajesService } from '../services/msg/mensajes.service';
import { VehiculoService } from '../services/vehiculo/vehiculo.service';
import { LocalvariableService } from '../services/local/localvariable.service';

@Component({
  selector: 'app-vehiculo',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent {
  public option: number = 1
  public estado: number | undefined

  public data: any[] = []
  public idVehiculo: number | undefined = 0
  public marca: string | undefined
  public modelo: string | undefined
  public anio:  number | undefined
  public placa: string | undefined
  public idCliente: number | undefined

  constructor(
    private vehiculoService: VehiculoService,
    private msgService: MensajesService,
    private clienteService: ClienteService,
    private localVarible: LocalvariableService
  ) { }

  ngOnInit(): void {
    this.vehiculoService.getVehiculos().subscribe(responseVehiculo => {
      const vehiculos = responseVehiculo.data as Array<{ username: string }>;
      this.data = (responseVehiculo.data as Array<any>)
      console.log(responseVehiculo)
      console.log("data", this.data)

      // TODO: get vehicles organized by clients, not id (Backend)

    }, error => { })
  }

  public edit(element: any) {
    this.option = 0
    this.idVehiculo = element.idVehiculo
    this.marca = element.marca
    this.modelo = element.modelo
    this.anio = element.anio
    this.placa = element.placa
    this.idCliente = element.idCliente

    console.log("EDIT: element.idVehiculo: ", element.idVehiculo)
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Está seguro de eliminar este cliente?")
    if (confirmacion) {
      this.vehiculoService.eliminarVehiculos(id).subscribe(response => {
        if (response.status == "success") {
          this.data = this.data.filter(d => d.idVehiculo != id)
        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
      })
    }
  }

  public save() {
    if (this.option == 1) { // AGREGAR
      this.vehiculoService.saveVehiculos({
        marca: this.marca,
        modelo: this.modelo,
        anio: this.anio,
        placa: this.placa,
        idCliente: this.idCliente
      }).subscribe(response => {
        if (response.status == "success") {
          this.data.push(response.data)
          this.limpiar()
        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
        console.log(error)
      })
    } else { // ACTUALIZAR
      this.vehiculoService.editVehiculos({
        idVehiculo: this.idVehiculo,
        marca: this.marca,
        modelo: this.modelo,
        anio: this.anio,
        placa: this.placa,
        idCliente: this.idCliente
      }).subscribe(response => {
        if (response.status == "success") {
          let element = this.data.find(d => d.idVehiculo == this.idVehiculo)
          if (element) {
            element.marca = this.marca
            element.modelo = this.modelo
            element.anio = this.anio
            element.placa = this.placa
            element.idCliente = this.idCliente
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

  public active() {
    return !(this.marca != undefined && this.marca != "" &&
            this.modelo != undefined && this.modelo != "" &&
            this.anio != undefined && this.anio >= 1886 &&
            this.placa != undefined && this.placa != "" &&
            this.idCliente != undefined && this.idCliente > 0)
  }

  private limpiar() {
    this.marca = undefined
    this.modelo = undefined
    this.anio = undefined
    this.placa= undefined
    this.idCliente = undefined
  }
}
