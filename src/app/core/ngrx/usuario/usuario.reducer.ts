import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { loginUsuarioSuccess, loginUsuarioFailure, LogoutUser } from './usuario.actions';

export const initialState: Usuario = {
  id: 0,
  usuario: '',
  contrasena: ''
};

export const _usuarioReducer = createReducer(
  initialState,
  on(loginUsuarioSuccess, (state, { user }) => ({ ...state, ...user })),
  on(LogoutUser, (state) => ({ ...state, id: 0, usuario: '', contrasena: '' }))
);

export const usuarioReducer = (state: any, action: any) => {
  return _usuarioReducer(state, action);
};
