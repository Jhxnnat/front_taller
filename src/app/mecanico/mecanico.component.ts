import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MecanicoService } from '../services/mecanico/mecanico.service';
import { MensajesService } from '../services/msg/mensajes.service';
import { LocalvariableService } from '../services/local/localvariable.service';

@Component({
  selector: 'app-mecanico',
  imports: [CommonModule, FormsModule],
  templateUrl: './mecanico.component.html',
  styleUrl: './mecanico.component.css'
})
export class MecanicoComponent {
  public option: number = 1
  public estado: number | undefined

  public data: any[] = []
  public idMecanico: number | undefined = 0
  public nombre: string | undefined
  public apellido: string | undefined
  public especialidad: string | undefined

  // public cliente: any

  constructor(
    private mecanicoService: MecanicoService,
    private msgService: MensajesService,
    private localVarible: LocalvariableService
  ) { }

  ngOnInit(): void {
    this.mecanicoService.getMecanicos().subscribe(responseMecanico => {
      const mecanicos = responseMecanico.data as Array<{ username: string }>;
      this.data = (responseMecanico.data as Array<any>)
      console.log(responseMecanico)
      console.log("data", this.data)
    }, error => { })
  }

  public edit(element: any) {
    this.option = 0
    this.idMecanico = element.idMecanico
    this.nombre = element.nombre
    this.apellido = element.apellido
    this.especialidad = element.especialidad

    console.log("EDIT: element.idMecanico: ", element.idMecanico)
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Está seguro de eliminar este mecanico?")
    if (confirmacion) {
      this.mecanicoService.eliminarMecanicos(id).subscribe(response => {
        if (response.status == "success") {
          this.data = this.data.filter(d => d.idMecanico != id)
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
      this.mecanicoService.saveMecanicos({
        nombre: this.nombre,
        apellido: this.apellido,
        especialidad: this.especialidad
      }).subscribe(response => {
        if (response.status == "success") {
          this.data.push(response.data)
          console.log(response.data)
          this.limpiar()
        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
        console.log(error)
      })
    } else { // ACTUALIZAR
      console.log("update")
      this.mecanicoService.editMecanicos({
        idMecanico: this.idMecanico,
        nombre: this.nombre,
        apellido: this.apellido,
        especialidad: this.especialidad
      }).subscribe(response => {
        if (response.status == "success") {
          let element = this.data.find(d => d.idMecanico == this.idMecanico)
          if (element) {
            element.nombre = this.nombre
            element.apellido = this.apellido
            element.especialidad = this.especialidad
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
    return !(this.idMecanico != undefined && this.idMecanico >= 0 &&
             this.nombre != undefined && this.nombre != "" &&
             this.apellido != undefined && this.apellido != "" &&
             this.especialidad != undefined && this.especialidad != "")
  }

  private limpiar() {
    this.idMecanico = undefined
    this.nombre = undefined
    this.apellido = undefined
    this.especialidad = undefined
  }
}
