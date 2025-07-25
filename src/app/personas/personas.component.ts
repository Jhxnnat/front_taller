import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonasService } from '../services/persona/personas.service';
import { MensajesService } from '../services/msg/mensajes.service';
import { TarjetasService } from '../services/tarjetas/tarjetas.service';
import { LocalvariableService } from '../services/local/localvariable.service';
import { BancosService } from '../services/banco/bancos.service';

@Component({
  selector: 'app-personas',
  imports: [CommonModule, FormsModule],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  public option: number = 1
  public data: any[] = []
  public cedula: string | undefined
  public nombres: string | undefined
  public apellidos: string | undefined
  public direccion: string | undefined
  public fecha_nacimiento: string | undefined
  public celular: string | undefined
  public userName: string | undefined
  public clave: string | undefined
  public confirmar: string | undefined
  public estado: number | undefined

  public persona: any

  constructor(
    private personaService: PersonasService,
    private msgService: MensajesService,
    private tarjetaService: TarjetasService,
    private localVarible: LocalvariableService
  ) { }

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe(responsePersona => {
      const personas = responsePersona.data as Array<{ userName: string }>;
      this.persona = personas.find(d => d.userName == this.localVarible.getUser())
      console.log(responsePersona)

      this.tarjetaService.getTarjetas().subscribe(responseTarjetas => {
        let tarjetas = (responseTarjetas.data as Array<any>).filter(d => d.banco.codigoBanco == this.persona.banco.codigoBanco)

        this.data = tarjetas.map(d => d.titular ? d.titular : d)
      })
    }, error => { })
  }

  public edit(element: any) {
    this.option = 2
    this.cedula = element.codigoFranquicia
    this.nombres = element.nombreFranquicia
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Esta seguro que desea eliminar el registro con el codigo: " + id + "?")

    if (confirmacion) {
      this.personaService.eliminnarPersonas(id).subscribe(response => {
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
      if (this.clave != this.confirmar) {
        this.msgService.mensajeError("La clave y confirmación no son iguales")
      } else {
        this.personaService.savePersonas({
          apellidos: this.apellidos,
          direccion: this.direccion,
          estado: this.estado == 1 ? true : false,
          fechaNacimiento: this.fecha_nacimiento,
          idPersona: this.cedula?.toString(),
          nombres: this.nombres,
          telefono: this.celular?.toString(),
          userName: this.userName,
          password: this.clave
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
      }
    } else { // Es un Actualizar
      this.personaService.editPersonas({
        codigoFranquicia: this.cedula,
        nombreFranquicia: this.nombres
      }).subscribe(response => {
        if (response.status == "success") {
          let element = this.data.find(d => d.codigoFranquicia == this.cedula)
          if (element) {
            element.nombreFranquicia = this.nombres
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
    return !(this.cedula != undefined && this.nombres != undefined && this.nombres != "" && this.apellidos != undefined && this.apellidos != ""
      && this.direccion != undefined && this.direccion != "" && this.celular != undefined && this.celular != ""
      && this.fecha_nacimiento != undefined && this.fecha_nacimiento != "" && this.userName != undefined && this.userName != ""
      && this.clave != undefined && this.clave != "" && this.confirmar != undefined && this.confirmar != ""
      && this.estado != undefined
    )
  }

  private limpiar() {
    this.cedula = undefined
    this.nombres = undefined
  }
}
