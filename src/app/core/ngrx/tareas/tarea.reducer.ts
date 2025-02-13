import { createReducer, on } from '@ngrx/store';
import { completedTarea, crearTarea, deletedTarea } from './tarea.actions'; 
import { Tarea } from '../../models';

export const initialState : Tarea[] = [
    new Tarea('Mi priemra tarea 1'),
    new Tarea('Mi priemra tarea 2'),
    new Tarea('Mi priemra tarea 3')
]

export const _tareaReducer = createReducer(
  initialState,
  on(crearTarea, (state,{description}) => [...state, new Tarea(description)]),
  on(completedTarea, (state,{id}) =>{
    
    return state.map(tarea =>{ 
      if(tarea.id === id){
        return {
          ...tarea,
          completado : !tarea.completado
        }
      }

      return tarea
      
    })
  }),

  on(deletedTarea, (state,{id}) =>{
    return state.filter(tarea => tarea.id !== id)
  }),

  
)

export const tareaReducer = (state: any, action: any) =>{
    return _tareaReducer(state, action)

}