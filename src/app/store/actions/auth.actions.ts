import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Usuario } from '../../core/models/usuario';
  
export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login Usuario': props<{ usuario: Usuario }>(),
        'Logout Usuario': emptyProps(),
    },
});