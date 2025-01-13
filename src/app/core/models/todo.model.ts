import { v4 as uuidv4 } from 'uuid';

export class Tarea { 
    public id : string;
    public description : string; 
    public completado : boolean;

    constructor(description:string){
        this.id = uuidv4();
        this.description = description;
        this.completado = false
    }
}