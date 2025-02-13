import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { loginUsuario, loginUsuarioFailure, loginUsuarioSuccess } from '../usuario.actions';

@Injectable()
export class UsuarioEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUsuario),
      mergeMap(({ user }) =>
        this.authService.loginUser(user.usuario, user.contrasena).pipe(
          map((data) => {
            if (data.token) {
              return loginUsuarioSuccess({ user: { ...data } });
            } else {
              return loginUsuarioFailure({ error: 'Credenciales inválidas' });
            }
          }),
          catchError((error) => of(loginUsuarioFailure({ error: error.message })))
        )
      )
    )
  );
}
