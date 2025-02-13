

export class Usuario { 
    

    constructor(
        public id : number,
        public usuario : string,
        public contrasena : string,

        public token? : string
    ){
       
    }
}