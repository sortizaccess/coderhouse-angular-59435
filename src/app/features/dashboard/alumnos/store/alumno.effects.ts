import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { AlumnoActions } from './alumno.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class AlumnoEffects {
  loadAlumnos$: Actions<Action<string>>;
  
  constructor(private actions$: Actions) { 
    this.loadAlumnos$ = createEffect(() => {
      return this.actions$.pipe(
  
        ofType(AlumnoActions.loadAlumnos),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        concatMap(() => EMPTY as Observable<{ type: string }>)
      );
    });
  }
}
