export interface Todo {
    id : number;
    titulo: string;
    descripcion: string;
    estado: 'POR_HACER' | 'EN_PROGRESO' | 'COMPLETADO'; // Enum opcional si hay más estados
    user_id: number;
}