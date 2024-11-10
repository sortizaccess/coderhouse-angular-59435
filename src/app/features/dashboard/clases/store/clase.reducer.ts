import { createFeature, createReducer, on } from '@ngrx/store';
import { ClaseActions } from './clase.actions';

export const claseFeatureKey = 'clase';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(ClaseActions.loadClases, state => state),

);

export const claseFeature = createFeature({
  name: claseFeatureKey,
  reducer,
});

