import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from '../../../../core/models/alumno';

export const AlumnoActions = createActionGroup({
  source: 'Alumno',
  events: {
    'Load Alumnos': emptyProps(),
    'Load Alumnos Success': props<{ data: Alumno[] }>(),
    'Load Alumnos Failure': props<{ error: unknown }>()
  }
});
