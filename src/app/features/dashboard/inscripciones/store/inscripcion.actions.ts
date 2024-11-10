import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripcion } from '../../../../core/models/inscripcion';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: Inscripcion[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>()   
  }
});
