import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarClasesComponent } from './crear-editar-clases/crear-editar-clases.component';
import { ListarClasesComponent } from './listar-clases/listar-clases.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    CrearEditarClasesComponent,
    ListarClasesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ClasesModule { }
