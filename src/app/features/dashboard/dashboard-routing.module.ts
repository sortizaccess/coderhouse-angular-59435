import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListarClasesComponent } from './clases/listar-clases/listar-clases.component';
import { ListarInscripcionesComponent } from './inscripciones/listar-inscripciones/listar-inscripciones.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'clases',
    component: ListarClasesComponent,
    loadChildren: () => import('./clases/clases.module').then((m) => m.ClasesModule),
  },  
  {
    path: 'inscripciones',
    component: ListarInscripcionesComponent,
    loadChildren: () => import('./inscripciones/inscripciones.module').then((m) => m.InscripcionesModule),
  },
  {
    path: '**',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
