import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarInscripcionesComponent } from './crear-editar-inscripciones/crear-editar-inscripciones.component';
import { ListarInscripcionesComponent } from './listar-inscripciones/listar-inscripciones.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';



@NgModule({
  declarations: [
    ListarInscripcionesComponent,
    CrearEditarInscripcionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([InscripcionEffects])
  ]
})
export class InscripcionesModule { }
