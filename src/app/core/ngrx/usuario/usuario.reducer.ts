import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { loginUsuario, LogoutUser } from './usuario.actions';


export const initialState : Usuario = {
  id : '',
  usuario : '',
  contrasena : ''
}
export const _usuarioReducer = createReducer(
  initialState,
  on(loginUsuario, ( state,   { user }  ) => {
    return ({ ...state, ...user})
  }),
  on(LogoutUser, state => ({ ...state, ...new Usuario('','','') }))
);

export const usuarioReducer = (state: any, action: any) => {
  return _usuarioReducer(state, action);
};
