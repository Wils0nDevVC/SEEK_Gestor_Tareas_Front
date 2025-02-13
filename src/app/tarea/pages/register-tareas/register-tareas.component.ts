import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from 'src/app/shared/services/product.service';
import { ResponseCustom } from 'src/app/shared/interfaces/response-custom.interface';
import { Todo } from 'src/app/core/interfaces/todo.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageControlService } from 'src/app/shared/services/message-control.service';
import { LocalService } from 'src/app/shared/services/local-service.service';

@Component({
  selector: 'app-dialog-crear-tarea',
  templateUrl: './register-tareas.component.html',
  styleUrls: ['./register-tareas.component.scss']
})
export class RegisterTareasComponent {
  tareaForm: FormGroup;
  updateValue : boolean = false
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterTareasComponent>,
    private Todoservice: TodosService,
    private messageService: MessageControlService,
    private localService : LocalService,
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo, update: boolean }
  ) {

    this.updateValue = data?.update 

    const user = JSON.parse(this.localService.getJsonValue('user'))
    this.tareaForm = this.fb.group({
      titulo: [{value : data?.todo?.titulo || '', disabled :this.updateValue }, Validators.required,],
      descripcion: [{value : data?.todo?.descripcion || '', disabled: this.updateValue }, Validators.required],
      estado: [data?.todo?.estado || 'POR_HACER', Validators.required],
      user_id: [user.id] // Esto lo puedes cambiar según el usuario autenticado
    });
  }

  onSubmit(){
    if(!this.updateValue){
      this.createTodo();
    }else{
      this.updateTodo();
    }
  }
  createTodo(){
    
    this.Todoservice.createTodo(this.tareaForm.value).subscribe({
      next: (data : ResponseCustom<Todo>) =>{
        if(data.state === 200 ){
          this.messageService.ShowSuccess(data.message);
        } 
      },
      complete : () => {
        this.dialogRef.close(true);
      }
    })
  }

  updateTodo(){
    this.Todoservice.updateTodo(this.data.todo.id.toString(),this.tareaForm.value['estado']).subscribe({
      next: (data : ResponseCustom<Todo>) =>{
        if(data.state === 200 ){
          this.messageService.ShowSuccess(data.message);
        } 
      },
      complete : () => {
        this.dialogRef.close(true);
      }
    })
  }


  onCancel(): void {
    this.dialogRef.close(null);
  }
}
