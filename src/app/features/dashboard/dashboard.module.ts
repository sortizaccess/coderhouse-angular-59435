import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';
import { ClasesModule } from './clases/clases.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AlumnosModule,
    SharedModule,
    CursosModule,
    ClasesModule,
    InscripcionesModule
  ]
})
export class DashboardModule { }
