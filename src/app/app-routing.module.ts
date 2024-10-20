import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { NotfoundComponent } from './features/auth/notfound/notfound.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AlumnosComponent } from './features/alumnos/alumnos.component';
import { ListarAlumnosComponent } from './features/alumnos/listar-alumnos/listar-alumnos.component';
import { CrearEditarAlumnosComponent } from './features/alumnos/crear-editar-alumnos/crear-editar-alumnos.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'alumnos',
    component: AlumnosComponent,
    children: [
      {
        path: 'listar',
        component: ListarAlumnosComponent
      },
      {
        path: 'crearEditar',
        component: CrearEditarAlumnosComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { 
    path: '**', //DEJAR SIEMPRE AL FINAL
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
