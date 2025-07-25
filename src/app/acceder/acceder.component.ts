import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../../models/login';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';
import { LocalvariableService } from '../services/local/localvariable.service';
import { MensajesService } from '../services/msg/mensajes.service';

@Component({
  selector: 'app-acceder',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './acceder.component.html',
  styleUrl: './acceder.component.css'
})
export class AccederComponent {
  public title: string = ""
  // public rol: string = "admin";
  public usuario: string = "";
  public password: string = "";
  public response: AuthResponse | undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private loginService: LoginService,
    private variableService : LocalvariableService,
    private msgService: MensajesService
  ) {
    this.route.data.subscribe(element => {
      this.title = element['title'] || '';
      this.titleService.setTitle(this.title);
    });
  }

  public login() {
    this.loginService.login(this.usuario, this.password).subscribe(response => {
      console.log('Login successful', response);
      this.response = response;
      if (this.response.status == "success") {
        // Almacenar Token
        this.variableService.setToken(this.response.data.accessToken)
        this.variableService.setRefreshToken(response.data.refreshToken)
        this.variableService.setUser(this.usuario)
        // Redirect to the panel if login is successful
        this.router.navigate(['/panel']);
      } else {
        this.msgService.mensajeError(this.response.message);
      }
    }, error => {
      this.msgService.mensajeError("Error al iniciar sesión, por favor intente nuevamente");
    });
  }
}
