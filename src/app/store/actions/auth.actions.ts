import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from '../../core/models/alumno';
  
export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login Alumno': props<{ alumno: Alumno }>(),
        'Logout Alumno': emptyProps(),
    },
});