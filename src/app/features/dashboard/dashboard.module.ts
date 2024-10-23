import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';
import { ClasesModule } from './clases/clases.module';
import { HomeModule } from './home/home.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AlumnosModule,
    CursosModule,
    ClasesModule,
    HomeModule,
    InscripcionesModule
  ]
})
export class DashboardModule { }
