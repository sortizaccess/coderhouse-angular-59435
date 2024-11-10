import { createFeature, createReducer, on } from '@ngrx/store';
import { ClaseActions } from './clase.actions';
import { Clase } from '../../../../core/models/clase';

export const claseFeatureKey = 'clase';

export interface State {
  clases: Clase[]
}

export const initialState: State = {
  clases: []
};

export const reducer = createReducer(
  initialState,
  on(ClaseActions.loadClases, state => state),
  on(ClaseActions.loadClasesSuccess, (state, action) => {
    return {
      ...state,
      clases: action.data
    }
  }),
);

export const claseFeature = createFeature({
  name: claseFeatureKey,
  reducer,
});

