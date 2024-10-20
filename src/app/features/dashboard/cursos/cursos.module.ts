import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { CrearEditarCursosComponent } from './crear-editar-cursos/crear-editar-cursos.component';



@NgModule({
  declarations: [
    ListarCursosComponent,
    CrearEditarCursosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CursosModule { }
