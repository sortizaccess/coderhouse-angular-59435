import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { CrearEditarCursosComponent } from './crear-editar-cursos/crear-editar-cursos.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    ListarCursosComponent,
    CrearEditarCursosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CursosModule { }
