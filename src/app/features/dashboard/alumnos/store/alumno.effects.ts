import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AlumnoActions } from './alumno.actions';
import { Action } from '@ngrx/store';
import { AlumnosService } from '../../../../core/services/alumnos.service';

@Injectable()
export class AlumnoEffects {
  loadAlumnos$: Actions<Action<string>>;
  
  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService,
  ) { 
    this.loadAlumnos$ = createEffect(() => {
      return this.actions$.pipe(

        ofType(AlumnoActions.loadAlumnos),
        concatMap(() =>
          this.alumnosService.getAll().pipe(
            map((response) => AlumnoActions.loadAlumnosSuccess({ data: response })),
            catchError((error) => of(AlumnoActions.loadAlumnosFailure({ error })))
          )
        )
      );
    });
  }
}
