import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { HomeComponent } from './home/home.component';
import { CursosModule } from './cursos/cursos.module';
import { ClasesModule } from './clases/clases.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AlumnosModule,
    CursosModule,
    ClasesModule
  ]
})
export class DashboardModule { }
