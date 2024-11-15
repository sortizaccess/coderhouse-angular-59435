import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { Usuario } from '../../core/models/usuario';

export const authFeatureName = 'auth';

export interface AuthState {
  usuarioAutenticado: Usuario | null;
}

const initialState: AuthState = {
  usuarioAutenticado: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginUsuario, (state, action) => {
    return {
      ...state,
      usuarioAutenticado: action.usuario,
    };
  }),
  on(AuthActions.logoutUsuario, (state) => {
    return {
      ...state,
      usuarioAutenticado: null,
    };
  })
);
