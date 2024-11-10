import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { CursoActions } from './curso.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class CursoEffects {
  loadCursos$: Actions<Action<string>>;
  
  constructor(private actions$: Actions) { 
    this.loadCursos$ = createEffect(() => {
      return this.actions$.pipe(
  
        ofType(CursoActions.loadCursos),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        concatMap(() => EMPTY as Observable<{ type: string }>)
      );
    });
  }
}
