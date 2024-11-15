import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Usuario } from '../../../../core/models/usuario';

export const UsuarioActions = createActionGroup({
  source: 'Usuario',
  events: {
    'Load Usuarios': emptyProps(),
    'Load Usuarios Success': props<{ data: Usuario[] }>(),
    'Load Usuarios Failure': props<{ error: unknown }>(),

    'Create Usuario': props<{ data: Usuario }>(),
    'Create Usuario Success': props<{ data: Usuario }>(),
    'Create Usuario Failure': props<{ error: Error }>(),
  }
});
