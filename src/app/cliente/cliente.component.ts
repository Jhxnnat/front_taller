import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../services/cliente/cliente.service';
import { MensajesService } from '../services/msg/mensajes.service';
import { LocalvariableService } from '../services/local/localvariable.service';

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  public option: number = 1
  public estado: number | undefined

  public data: any[] = []
  public idCliente: number | undefined = 0
  public nombre: string | undefined
  public apellido: string | undefined
  public telefono: string | undefined
  public email: string | undefined

  // public cliente: any

  constructor(
    private clienteService: ClienteService,
    private msgService: MensajesService,
    private localVarible: LocalvariableService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(responseCliente => {
      const clientes = responseCliente.data as Array<{ username: string }>;
      this.data = (responseCliente.data as Array<any>)
      console.log(responseCliente)
      console.log("data", this.data)

    }, error => { })
  }

  public edit(element: any) {
    this.option = 0
    this.idCliente = element.idCliente
    this.nombre = element.nombre
    this.apellido = element.apellido
    this.email = element.email
    this.telefono = element.telefono

    console.log("EDIT: element.idCliente: ", element.idCliente)
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Está seguro de eliminar este cliente?")
    if (confirmacion) {
      //TODO: algo remove client vehicles
      this.clienteService.eliminarClientes(id).subscribe(response => {
        if (response.status == "success") {
          this.data = this.data.filter(d => d.idCliente != id)
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
      this.clienteService.saveClientes({
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono?.toString(),
        email: this.email
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
    } else { // Es un Actualizar
      console.log("update")
      this.clienteService.editClientes({
        idCliente: this.idCliente,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        email: this.email
      }).subscribe(response => {
        if (response.status == "success") {
          let element = this.data.find(d => d.idCliente == this.idCliente)
          if (element) {
            element.nombre = this.nombre
            element.apellido = this.apellido
            element.telefono = this.telefono
            element.email = this.email
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
    return !(this.idCliente != undefined && this.idCliente >= 0 &&
             this.nombre != undefined && this.nombre != "" &&
             this.apellido != undefined && this.apellido != "" &&
             this.telefono != undefined && this.telefono != "" &&
             this.email != undefined && this.email != "")
  }

  private limpiar() {
    this.idCliente = undefined
    this.nombre = undefined
    this.apellido = undefined
    this.telefono = undefined
    this.email = undefined
  }
}
