import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnoActions } from './alumno.actions';

export const alumnoFeatureKey = 'alumno';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(AlumnoActions.loadAlumnos, state => state),

);

export const alumnoFeature = createFeature({
  name: alumnoFeatureKey,
  reducer,
});

