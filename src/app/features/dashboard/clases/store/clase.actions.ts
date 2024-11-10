import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Clase } from '../../../../core/models/clase';

export const ClaseActions = createActionGroup({
  source: 'Clase',
  events: {
    'Load Clases': emptyProps(),
    'Load Clases Success': props<{ data: Clase[] }>(),
    'Load Clases Failure': props<{ error: unknown }>(),
  }
});
