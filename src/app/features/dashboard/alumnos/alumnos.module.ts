import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarAlumnosComponent } from '../alumnos/crear-editar-alumnos/crear-editar-alumnos.component';
import { ListarAlumnosComponent } from '../alumnos/listar-alumnos/listar-alumnos.component';
import { SharedModule } from '../../../shared/shared.module';


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
