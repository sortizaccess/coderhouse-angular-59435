import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class InscripcionEffects {
  loadInscripciones$: Actions<Action<string>>;
  
  constructor(private actions$: Actions) { 
    this.loadInscripciones$ = createEffect(() => {
      return this.actions$.pipe(
  
        ofType(InscripcionActions.loadInscripcions),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        concatMap(() => EMPTY as Observable<{ type: string }>)
      );
    });
  }
}
