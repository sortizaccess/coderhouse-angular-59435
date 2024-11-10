import { createFeature, createReducer, on } from '@ngrx/store';
import { CursoActions } from './curso.actions';
import { Curso } from '../../../../core/models/curso';

export const cursoFeatureKey = 'curso';

export interface State {
  cursos: Curso[]
}

export const initialState: State = {
  cursos: []
};

export const reducer = createReducer(
  initialState,
  on(CursoActions.loadCursos, state => state),
  on(CursoActions.loadCursosSuccess, (state, action) => {
    return {
      ...state,
      cursos: action.data
    }
  })
);

export const cursoFeature = createFeature({
  name: cursoFeatureKey,
  reducer,
});

