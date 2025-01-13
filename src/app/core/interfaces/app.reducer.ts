import { Tarea, Usuario } from "../models";



export interface AppState {
    tarea : Tarea[];
    usuario : Usuario  ;
}