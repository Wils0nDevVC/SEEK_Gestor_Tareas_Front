import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

// Acción para iniciar sesión (se activa desde el componente)
export const loginUsuario = createAction(
  '[Usuario] Login usuario',
  props<{ user: Usuario }>()
);

// Acción cuando el login es exitoso
export const loginUsuarioSuccess = createAction(
  '[Usuario] Login usuario Success',
  props<{ user: Usuario }>()
);

// Acción cuando el login falla
export const loginUsuarioFailure = createAction(
  '[Usuario] Login usuario Failure',
  props<{ error: string }>()
);

// Acción para cerrar sesión
export const LogoutUser = createAction('[Usuario] Logout usuario');
