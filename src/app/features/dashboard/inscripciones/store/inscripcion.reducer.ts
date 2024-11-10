import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { Inscripcion } from '../../../../core/models/inscripcion';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  inscripciones: Inscripcion[]
}

export const initialState: State = {
  inscripciones: []
};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.loadInscripciones, state => state),
  on(InscripcionActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      inscripciones: action.data
    }
  }),
);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

