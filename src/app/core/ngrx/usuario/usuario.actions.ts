import { createAction, props } from "@ngrx/store";
import { Usuario } from "../../models";



export const loginUsuario = createAction(
    '[Usuario] Login usuario',
    props<{user: Usuario  } >()
);

export const LogoutUser = createAction('[Usuario] Logout usuario');


