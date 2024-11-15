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
  createAlumno$: Actions<Action<string>>;
  createAlumnoSuccess$: Actions<Action<string>>;

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

    this.createAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnoActions.createAlumno),
        concatMap((action) =>
          this.alumnosService
            .add(action.data)
            .pipe(
              map((data) => AlumnoActions.createAlumnoSuccess({ data })),
              catchError((error) =>
                of(AlumnoActions.createAlumnoFailure({ error }))
              )
            )        
        )
      );
    });
    this.createAlumnoSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnoActions.createAlumnoSuccess),
        map(() => AlumnoActions.loadAlumnos())
      );
    });
  }
}