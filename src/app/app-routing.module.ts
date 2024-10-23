import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { NotfoundComponent } from './features/auth/notfound/notfound.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ListarAlumnosComponent } from './features/dashboard/alumnos/listar-alumnos/listar-alumnos.component';
import { ListarCursosComponent } from './features/dashboard/cursos/listar-cursos/listar-cursos.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { ListarClasesComponent } from './features/dashboard/clases/listar-clases/listar-clases.component';

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
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'alumnos',
        component: ListarAlumnosComponent
      },
      {
        path: 'cursos',
        component: ListarCursosComponent
      },
      {
        path: 'clases',
        component: ListarClasesComponent
      },
    ]
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
