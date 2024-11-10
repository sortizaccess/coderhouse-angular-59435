import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnoActions } from './alumno.actions';
import { Alumno } from '../../../../core/models/alumno';

export const alumnoFeatureKey = 'alumno';

export interface State {
  alumnos: Alumno[];
}

export const initialState: State = {
  alumnos: []
};

export const reducer = createReducer(
  initialState,
  on(AlumnoActions.loadAlumnos, state => state),
  on(AlumnoActions.loadAlumnosSuccess, (state, action) => {
    return {
      ...state,
      alumnos: action.data
    }
  }),

  on(AlumnoActions.createAlumno, (state) => {
    return {
      ...state
    };
  })
);

export const alumnoFeature = createFeature({
  name: alumnoFeatureKey,
  reducer,
});

