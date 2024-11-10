import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursoActions } from './curso.actions';
import { Action } from '@ngrx/store';
import { CursosService } from '../../../../core/services/cursos.service';

@Injectable()
export class CursoEffects {
  loadCursos$: Actions<Action<string>>;
  
  constructor(
    private actions$: Actions,
    private cursosService: CursosService,
  ) { 

    this.loadCursos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CursoActions.loadCursos),
        concatMap(() =>
          this.cursosService.getAll().pipe(
            map((response) => CursoActions.loadCursosSuccess({ data: response })),
            catchError((error) => of(CursoActions.loadCursosFailure({ error })))
          )
        )
      );
    });
  }
}
