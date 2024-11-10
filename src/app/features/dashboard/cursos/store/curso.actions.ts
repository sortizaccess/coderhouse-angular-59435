import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CursoActions = createActionGroup({
  source: 'Curso',
  events: {
    'Load Cursos': emptyProps(),
    
    
  }
});
