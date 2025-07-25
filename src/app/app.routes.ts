import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AccederComponent } from './acceder/acceder.component';
import { HomeComponent } from './home/home.component';
import { PanelComponent } from './panel/panel.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MecanicoComponent } from './mecanico/mecanico.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent,
        data: { title: 'Inicio | Tarjeta' }
    },
    {
        path: "contact", component: ContactComponent,
        data: { title: 'Contacto | Tarjeta' }
    },
    {
        path: "acceder", component: AccederComponent,
        data: { title: 'Acceder | Tarjeta' }
    },
    {
        path: "panel", component: PanelComponent,
        data: { title: 'Panel | Tarjeta' },
        children: [
            {
                path: "", component: BienvenidoComponent
            },
            {
                path: "clientes", component: ClienteComponent
            },
            {
              path: "personal", component: MecanicoComponent
            },
            {
              path: "vehiculos", component: VehiculoComponent
            }
        ]
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];
