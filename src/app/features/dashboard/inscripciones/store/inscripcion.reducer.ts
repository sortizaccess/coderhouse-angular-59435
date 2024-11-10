import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.loadInscripcions, state => state),

);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

