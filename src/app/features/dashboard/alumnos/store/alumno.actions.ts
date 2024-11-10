import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AlumnoActions = createActionGroup({
  source: 'Alumno',
  events: {
    'Load Alumnos': emptyProps(),
    
    
  }
});
