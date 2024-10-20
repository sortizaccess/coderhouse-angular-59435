import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarAlumnosComponent } from './crear-editar-alumnos/crear-editar-alumnos.component';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CrearEditarAlumnosComponent,
    ListarAlumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AlumnosModule { }
