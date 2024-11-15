import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);

export const selectUsuarioAutenticado = createSelector( selectAuthState, (state) => state.usuarioAutenticado );
