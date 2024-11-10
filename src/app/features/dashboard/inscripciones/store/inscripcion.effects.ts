import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { Action } from '@ngrx/store';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';

@Injectable()
export class InscripcionEffects {
  loadInscripciones$: Actions<Action<string>>;
  
  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService,
  ) { 

    this.loadInscripciones$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionActions.loadInscripciones),
        concatMap(() =>
          this.inscripcionesService.getAll().pipe(
            map((response) => InscripcionActions.loadInscripcionesSuccess({ data: response })),
            catchError((error) => of(InscripcionActions.loadInscripcionesFailure({ error })))
          )
        )
      );
    });

  }
}
