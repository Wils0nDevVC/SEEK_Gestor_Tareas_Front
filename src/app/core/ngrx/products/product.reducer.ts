// src/app/store/reducers/product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Product, ProductResponse } from '../../interfaces/product.interface';
import { cargarProductos, cargarProductosFailure, cargarProductosSuccess } from './product.actions';

export interface ProductState {
  productos: ProductResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  productos: [],
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(cargarProductos, (state) => ({
    ...state,
    loading: true
  })),
  on(cargarProductosSuccess, (state, { productos }) => ({
    ...state,
    loading: false,
    productos
  })),
  on(cargarProductosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
