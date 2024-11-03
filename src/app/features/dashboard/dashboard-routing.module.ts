import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListarAlumnosComponent } from './alumnos/listar-alumnos/listar-alumnos.component';
import { ListarCursosComponent } from './cursos/listar-cursos/listar-cursos.component';
import { ListarClasesComponent } from './clases/listar-clases/listar-clases.component';
import { ListarInscripcionesComponent } from './inscripciones/listar-inscripciones/listar-inscripciones.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'alumnos',
    component: ListarAlumnosComponent,
    loadChildren: () => import('./alumnos/alumnos.module').then((m) => m.AlumnosModule),
  },
  {
    path: 'cursos',
    component: ListarCursosComponent,
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
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
