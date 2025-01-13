// src/app/store/effects/product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { cargarProductos, cargarProductosFailure, cargarProductosSuccess } from './product.actions';
import { ProductResponse } from '../../interfaces/product.interface';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  cargarProductos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(cargarProductos),
      switchMap(() => 
        this.productService.getProducts().pipe(
          map((response: ProductResponse) => cargarProductosSuccess({ productos: response.Data })), // Usa 'Data' de 'ProductResponse'
          catchError((error) => of(cargarProductosFailure({ error })))
        )
      )
    )
  );
}
