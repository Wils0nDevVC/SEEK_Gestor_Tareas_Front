

export class Usuario { 
    

    constructor(
        public id : string,
        public usuario : string,
        public contrasena : string,

        public token? : string
    ){
       
    }
}