import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarAlumnosComponent } from '../alumnos/crear-editar-alumnos/crear-editar-alumnos.component';
import { ListarAlumnosComponent } from '../alumnos/listar-alumnos/listar-alumnos.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AlumnoEffects } from './store/alumno.effects';


@NgModule({
  declarations: [
    CrearEditarAlumnosComponent,
    ListarAlumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([AlumnoEffects])
  ]
})
export class AlumnosModule { }
