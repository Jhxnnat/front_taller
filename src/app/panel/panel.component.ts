import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LocalvariableService } from '../services/local/localvariable.service';
import { TokenService } from '../services/token/token.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login/login.service';
import { MensajesService } from '../services/msg/mensajes.service';

@Component({
  selector: 'app-panel',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
  standalone: true
})
export class PanelComponent {
  public title: string = ""
  public username: string = ""
  public perfil_name: string = ""

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private token: TokenService,
    private loginService: LoginService,
    private router: Router,
    private msgService: MensajesService
  ) {
    this.route.data.subscribe(element => {
      this.title = element['title'] || '';
      this.titleService.setTitle(this.title);
    });

    let data = this.token.getDecodedToken()
    if (data) {
      this.username = data.sub;
      this.perfil_name = data.nombres + " " + data.apellidos;
    }
    console.log(this.token.getDecodedToken())
  }

  public async cerrarSesion() {
    if (await this.msgService.mensajeConfirmacion("¿Seguro desea cerrar la sesión?")) {
      this.loginService.logout(this.username).subscribe(response => {
        this.router.navigate(["/"])
      }, error => {
        this.msgService.mensajeError("No se logro cerrar la sesión")
      })
    }
  }

  // Funcion propia de rutas
  public urlRouter(url:string){
    this.router.navigate([url])
  }

}
