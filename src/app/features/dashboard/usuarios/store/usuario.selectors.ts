import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuario from './usuario.reducer';

export const selectUsuariosState = createFeatureSelector<fromUsuario.State>(
  fromUsuario.usuarioFeatureKey
);

export const selectUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.usuarios
);
