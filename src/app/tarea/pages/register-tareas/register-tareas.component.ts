import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/interfaces';
import  * as actions  from '../../../core/ngrx/tareas/tarea.actions';
import { Tarea, Usuario } from '../../../core/models';
import { LocalService } from '../../../shared/services/local-service.service';
import { loginUsuario } from '../../../core/ngrx/usuario/usuario.actions';

@Component({
  selector: 'app-register-tareas',
  templateUrl: './register-tareas.component.html',
  styleUrls: ['./register-tareas.component.scss']
})
export class RegisterTareasComponent implements OnInit {
 
  formTarea : FormGroup
  menssage : string = ""
  validateMessage! : boolean
  usuario! : Usuario 

  isTarea! : boolean
  constructor(
    private store : Store<AppState>,
    private localService : LocalService


  ){
    

    this.formTarea = new FormGroup({
      description: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]),
      
    });
    
  }
  ngOnInit(): void {
    const usuario : string = this.localService.getJsonValue('user')!
    const user : Usuario = JSON.parse(usuario)
    this.store.dispatch(loginUsuario({user : { ...user }}));
  

    this.getUser()
  }
 

  sendTarea(){

      this.validForm()
      const { value } = this.formTarea;
      const isExist = this.existTarea(value.description.trim())
      this.validateMessage = true
      if(!isExist){
        this.store.dispatch(actions.crearTarea({description: value.description.trim() }))
        this.menssage = "Se registro correctamente"
        this.isTarea = false
        this.formTarea.reset();
      }else{

        this.isTarea = true
        this.menssage = "Ya existe la tarea"
      }
      
    setTimeout(()=>{
      this.validateMessage = false
    },2000)
  }

  existTarea(description:string){
    let isExist : boolean = false
    this.store.select('tarea')
    .subscribe(tareas => {
      isExist = tareas.some(tarea=> tarea.description === description)
    } );

    return isExist
  }
  getUser(){
    this.store.select('usuario').subscribe(user => this.usuario = user )
  }


  validForm(){
    if(this.formTarea.invalid) { return }
  }


}
