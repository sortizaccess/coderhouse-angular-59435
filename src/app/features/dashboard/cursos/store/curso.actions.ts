import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Curso } from '../../../../core/models/curso';

export const CursoActions = createActionGroup({
  source: 'Curso',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: Curso[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),
  }
});
