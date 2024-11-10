import { createFeature, createReducer, on } from '@ngrx/store';
import { CursoActions } from './curso.actions';

export const cursoFeatureKey = 'curso';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CursoActions.loadCursos, state => state),

);

export const cursoFeature = createFeature({
  name: cursoFeatureKey,
  reducer,
});

