import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { SharedModule } from '../../../shared/shared.module';
import { CrearEditarUsuariosComponent } from './crear-editar-usuarios/crear-editar-usuarios.component';
import { usuarioFeature } from './store/usuario.reducer';
import { UsuarioEffects } from './store/usuario.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    ListarUsuariosComponent,
    CrearEditarUsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(usuarioFeature),
    EffectsModule.forFeature([UsuarioEffects])
  ],
  exports: [
    ListarUsuariosComponent
  ]
})
export class UsuariosModule { }
