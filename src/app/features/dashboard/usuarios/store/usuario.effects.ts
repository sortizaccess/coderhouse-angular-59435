import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UsuarioActions } from './usuario.actions';
import { Action } from '@ngrx/store';
import { UsuariosService } from '../../../../core/services/usuarios.service';

@Injectable()
export class UsuarioEffects {
  loadUsuario$: Actions<Action<string>>;
  createUsuario$: Actions<Action<string>>;
  createUsuarioSuccess$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private usuariosService: UsuariosService,
  ) { 
    
    this.loadUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuarioActions.loadUsuarios),
        concatMap(() =>
          this.usuariosService.getAll().pipe(
            map((response) => UsuarioActions.loadUsuariosSuccess({ data: response })),
            catchError((error) => of(UsuarioActions.loadUsuariosFailure({ error })))
          )
        )
      );
    });

    this.createUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuarioActions.createUsuario),
        concatMap((action) =>
          this.usuariosService
            .add(action.data)
            .pipe(
              map((data) => UsuarioActions.createUsuarioSuccess({ data })),
              catchError((error) =>
                of(UsuarioActions.createUsuarioFailure({ error }))
              )
            )        
        )
      );
    });
    this.createUsuarioSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuarioActions.createUsuarioSuccess),
        map(() => UsuarioActions.loadUsuarios())
      );
    });
  }
}
