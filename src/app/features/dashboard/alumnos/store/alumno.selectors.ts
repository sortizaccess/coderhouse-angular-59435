import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumno from './alumno.reducer';

export const selectAlumnoState = createFeatureSelector<fromAlumno.State>(
  fromAlumno.alumnoFeatureKey
);

export const selectAlumnos = createSelector(
  selectAlumnoState,
  (state) => state.alumnos
);
