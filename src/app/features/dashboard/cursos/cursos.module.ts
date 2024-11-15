import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { CrearEditarCursosComponent } from './crear-editar-cursos/crear-editar-cursos.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CursoEffects } from './store/curso.effects';
import { StoreModule } from '@ngrx/store';
import { cursoFeature } from './store/curso.reducer';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';



@NgModule({
  declarations: [
    ListarCursosComponent,
    CrearEditarCursosComponent,
    DetalleCursosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
    StoreModule.forFeature(cursoFeature),
    EffectsModule.forFeature([CursoEffects])
  ],
  exports: [
    ListarCursosComponent
  ]
})
export class CursosModule { }
