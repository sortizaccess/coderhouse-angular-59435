import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AlumnosModule } from './alumnos/alumnos.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AlumnosModule
  ]
})
export class DashboardModule { }
