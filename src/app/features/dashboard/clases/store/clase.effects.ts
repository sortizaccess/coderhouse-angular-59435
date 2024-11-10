import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ClaseActions } from './clase.actions';
import { Action } from '@ngrx/store';
import { ClasesService } from '../../../../core/services/clases.service';

@Injectable()
export class ClaseEffects {
  loadClases$: Actions<Action<string>>;
  
  constructor(
    private actions$: Actions,
    private clasesService: ClasesService,
  ) { 
    this.loadClases$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ClaseActions.loadClases),
        concatMap(() =>
          this.clasesService.getAll().pipe(
            map((response) => ClaseActions.loadClasesSuccess({ data: response })),
            catchError((error) => of(ClaseActions.loadClasesFailure({ error })))
          )
        )
      );
    });
  }
}
