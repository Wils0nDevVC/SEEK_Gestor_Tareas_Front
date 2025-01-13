// src/app/store/actions/product.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product, ProductResponse } from '../../interfaces/product.interface';

export const cargarProductos = createAction('[Product] Cargar Productos');

export const cargarProductosSuccess = createAction(
  '[Product] Cargar Productos Success',
  props<{ productos: ProductResponse[] }>()
);

export const cargarProductosFailure = createAction(
  '[Product] Cargar Productos Failure',
  props<{ error: any }>()
);
