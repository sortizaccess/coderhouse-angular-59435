import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarAlumnosComponent } from '../alumnos/crear-editar-alumnos/crear-editar-alumnos.component';
import { ListarAlumnosComponent } from '../alumnos/listar-alumnos/listar-alumnos.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { AlumnoEffects } from './store/alumno.effects';
import { StoreModule } from '@ngrx/store';
import { alumnoFeature } from './store/alumno.reducer';
import { DetalleAlumnosComponent } from './detalle-alumnos/detalle-alumnos.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';


@NgModule({
  declarations: [
    CrearEditarAlumnosComponent,
    ListarAlumnosComponent,
    DetalleAlumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(alumnoFeature),
    EffectsModule.forFeature([AlumnoEffects])
  ],
  exports: [
    ListarAlumnosComponent
  ]
})
export class AlumnosModule { }
