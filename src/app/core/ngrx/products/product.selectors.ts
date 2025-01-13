// src/app/store/selectors/product.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.productos
);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);
