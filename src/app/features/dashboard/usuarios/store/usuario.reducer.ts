import { createFeature, createReducer, on } from '@ngrx/store';
import { UsuarioActions } from './usuario.actions';
import { Usuario } from '../../../../core/models/usuario';

export const usuarioFeatureKey = 'usuario';

export interface State {
  usuarios: Usuario[];
}

export const initialState: State = {
  usuarios: []
};

export const reducer = createReducer(
  initialState,
  on(UsuarioActions.loadUsuarios, state => state),
  on(UsuarioActions.loadUsuariosSuccess, (state, action) => {
    return {
      ...state,
      usuarios: action.data
    }
  }),

  on(UsuarioActions.createUsuario, (state) => {
    return {
      ...state
    };
  })
);

export const usuarioFeature = createFeature({
  name: usuarioFeatureKey,
  reducer,
});

