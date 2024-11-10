import { createReducer, on } from '@ngrx/store';
import { Alumno } from '../../core/models/alumno';
import { AuthActions } from '../actions/auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
    alumnoAutenticado: Alumno | null;
}

const initialState: AuthState = {
    alumnoAutenticado: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginAlumno, (state, action) => {
    return {
      ...state,
      alumnoAutenticado: action.alumno,
    };
  }),
  on(AuthActions.logoutAlumno, (state) => {
    return {
      ...state,
      alumnoAutenticado: null,
    };
  })
);
