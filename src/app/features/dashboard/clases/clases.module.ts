import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEditarClasesComponent } from './crear-editar-clases/crear-editar-clases.component';
import { ListarClasesComponent } from './listar-clases/listar-clases.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ClaseEffects } from './store/clase.effects';
import { claseFeature } from './store/clase.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    CrearEditarClasesComponent,
    ListarClasesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(claseFeature),
    EffectsModule.forFeature([ClaseEffects])
  ]
})
export class ClasesModule { }
