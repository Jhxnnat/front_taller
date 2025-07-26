import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../services/cliente/cliente.service';
import { VehiculoService } from '../services/vehiculo/vehiculo.service';
import { MensajesService } from '../services/msg/mensajes.service';
import { LocalvariableService } from '../services/local/localvariable.service';
import { ServicioService } from '../services/servicio/servicio.service';

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

  public idVehiculo: number | undefined = 0
  public vehiculo_marca: string | undefined
  public vehiculo_modelo: string | undefined
  public vehiculo_placa: string | undefined
  public vehiculo_anio: number | undefined

  public idServicio: number | undefined = 0
  public servicio_descripcion: string | undefined
  public servicio_estado: string | undefined
  public servicio_fecha: Date | undefined

  private _Cliente: any | undefined
  private _Vehiculo: any | undefined

  constructor(
    private clienteService: ClienteService,
	private vehiculoService: VehiculoService,
	private servicioService: ServicioService,
    private msgService: MensajesService,
    private localVarible: LocalvariableService
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(responseCliente => {
      const clientes = responseCliente.data as Array<{ username: string }>;
      this.data = (responseCliente.data as Array<any>)
      console.log("data", this.data)
	  this.data.forEach( (element) => {
		  console.log(element)
		  this.vehiculoService.getVehiculosClientes(element.idCliente).subscribe(responseVehiculo => {
			  const _vehiculo = (responseVehiculo.data as Array<any>)
			  console.log("_vehiculo", _vehiculo)
			  element.vehiculo = _vehiculo[0]

			  this.servicioService.getServiciosVehiculos(_vehiculo[0].idVehiculo).subscribe(response => {
				  const _servicio = (response.data as Array<any>)
				  console.log("response_servicio", response.data)
				  console.log("_servicio", _servicio[0])
				  element.servicio = _servicio[0]
			  })
		  });
	  });
    }, error => { })
  }

  public edit(element: any) {
    this.option = 0
    this.idCliente = element.idCliente
    this.nombre = element.nombre
    this.apellido = element.apellido
    this.email = element.email
    this.telefono = element.telefono
	
	this.idVehiculo = element.vehiculo.idVehiculo
	console.log("idVehiculo...", this.idVehiculo)
	this.vehiculo_marca = element.vehiculo.marca
	this.vehiculo_modelo = element.vehiculo.modelo
	this.vehiculo_placa = element.vehiculo.placa
	this.vehiculo_anio = element.vehiculo.anio

	this.idServicio = element.servicio.idServicio
	console.log("servicio...", element.servicio)
	this.servicio_estado = element.servicio.estado
	this.servicio_descripcion = element.servicio.descripcion
  }

  public async remove(id: number) {
    let confirmacion = await this.msgService.mensajeConfirmacion("¿Está seguro de eliminar este cliente? La acción tamibén eliminará vehiculos y servicios")
    if (confirmacion) {
      this.clienteService.eliminarClientesCompleto(id).subscribe(response => {
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
    if (this.option == 1) { // AGREGAR
		// guardar cliente
      this.clienteService.saveClientes({
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono?.toString(),
        email: this.email
      }).subscribe(response => {
        if (response.status == "success") {
          this.data.push(response.data)
		  this._Cliente = (response.data as Array<any>)
		  // guardar vehiculo
		  this.vehiculoService.saveVehiculos({
			marca: this.vehiculo_marca,
			modelo: this.vehiculo_modelo,
			anio: this.vehiculo_anio,
			placa: this.vehiculo_placa,
			idCliente: this._Cliente.idCliente
		  }).subscribe(response => {
			if (response.status == "success") {
				this._Vehiculo = (response.data as Array<any>);
				console.log("_Vehiculo:", this._Vehiculo);
				this.servicioService.saveServicios({
					descripcion: "sting",// this.servicio_descripcion,
					fecharegistro: Date.now(),
					estado: "string",// this.servicio_estado,
					idVehiculo: this._Vehiculo.idVehiculo,
				}).subscribe(response => {
					if (response.status != "success") {
						this.msgService.mensajeError(response.message)
					}
				})
			} else {
				this.msgService.mensajeError(response.message)
			}
			//TODO: the data in data.push(response.data) wont push this vehicules, need to relaod page to get to show vehicles

		  }, error => {
			this.msgService.mensajeError("No se pudo conectar")
			console.log(error)
		  })
		//---
          this.limpiar()

        } else {
          this.msgService.mensajeError(response.message)
        }
      }, error => {
        this.msgService.mensajeError("No se pudo conectar")
        console.log(error)
      })
    } else { // ACTUALIZAR
		// TODO: add vehiculos && servicios
      this.clienteService.editClientes({
        idCliente: this.idCliente,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        email: this.email
      }).subscribe(response => {
        if (response.status == "success") {
			//--
		  this._Cliente = (response.data as Array<any>)
		  console.log("EDIT:", this._Cliente)
		  // guardar vehiculo
		  this.vehiculoService.editVehiculos({
			idVehiculo: this.idVehiculo,
			marca: this.vehiculo_marca,
			modelo: this.vehiculo_modelo,
			anio: this.vehiculo_anio,
			placa: this.vehiculo_placa,
			idCliente: this._Cliente.idCliente
		  }).subscribe(response => {
			if (response.status != "success") {
				this.msgService.mensajeError(response.message)
			} else {
				this._Vehiculo = (response.data as Array<any>);
				this.servicioService.editServicios({
					idServicio: this.idServicio,
					descripcion: "string",// this.servicio_descripcion,
					estado: "string", // this.servicio_estado,
					idVehiculo: this.idVehiculo,
					fecharegistro: Date.now()
				}).subscribe(response => {
					if (response.status != "success") {
						this.msgService.mensajeError(response.message)
					}
				})
			}
		  }, error => {
			this.msgService.mensajeError("No se pudo conectar")
			console.log(error)
		  })
			//--

          let element = this.data.find(d => d.idCliente == this.idCliente)
          if (element) {
            element.nombre = this.nombre
            element.apellido = this.apellido
            element.telefono = this.telefono
            element.email = this.email
			// element.vehiculo = this.vehiculo
			// element.servicio = this.servicio
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
	  //TODO: ADD all fields
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

	this.idVehiculo = undefined
	this.vehiculo_marca = undefined
	this.vehiculo_modelo = undefined
	this.vehiculo_placa = undefined
	this.vehiculo_anio = undefined

	this.idServicio = undefined
	this.servicio_descripcion =  undefined
	this.servicio_estado = undefined
	this.servicio_fecha = undefined
  }

  public contact(element: any) {
	this.msgService.mensajeInfo('Contacto', [`Telefono: ${element.telefono}`, `Correo: ${element.email}`])
  }

  public servicios(element: any) {
	this.servicioService.getServiciosVehiculos(element.vehiculo.idVehiculo).subscribe(response => {
		const servicios = (response.data as Array<any>)[0];
		//console.log("servicios: ", servicios[0].descripcion)
		this.msgService.mensajeInfo('Servicio', [`Estado: ${servicios.estado}`,`Descripcion: ${servicios.descripcion}`, `Fecha Registro: ${servicios.fecharegistro}`]);
	}, error => { })
  }
}
