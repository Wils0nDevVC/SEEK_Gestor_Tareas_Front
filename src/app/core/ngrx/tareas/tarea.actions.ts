import { createAction, props } from "@ngrx/store";
import { Tarea } from "../../models";


export const crearTarea = createAction(
    '[Tarea] Crea tarea',
    props<{description : string} >()
);

export const completedTarea = createAction(
    '[Tarea] Completar tarea',
    props<{id : string} >()
);

export const deletedTarea = createAction(
    '[Tarea] Eliminar tarea',
    props<{id : string} >()
);

