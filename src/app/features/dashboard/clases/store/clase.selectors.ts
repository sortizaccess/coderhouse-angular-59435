import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClase from './clase.reducer';

export const selectClaseState = createFeatureSelector<fromClase.State>(
  fromClase.claseFeatureKey
);
