import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripcions': emptyProps(),
    
    
  }
});
