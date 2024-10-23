import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarInscripcionesComponent } from './crear-editar-inscripciones/crear-editar-inscripciones.component';
import { ListarInscripcionesComponent } from './listar-inscripciones/listar-inscripciones.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ListarInscripcionesComponent,
    CrearEditarInscripcionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class InscripcionesModule { }
