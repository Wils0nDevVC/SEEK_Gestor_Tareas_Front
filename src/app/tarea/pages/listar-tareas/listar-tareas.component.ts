import { LocalService } from './../../../shared/services/local-service.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  Product,
  ProductResponse,
} from 'src/app/core/interfaces/product.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseComponent } from 'src/app/component/dialog-response/dialog-response.component';
import { MessageControlService } from 'src/app/shared/services/message-control.service';
import { TodosService } from 'src/app/shared/services/product.service';
import { ResponseCustom } from 'src/app/shared/interfaces/response-custom.interface';
import { Todo } from 'src/app/core/interfaces/todo.interface';
import { RegisterTareasComponent } from '../register-tareas/register-tareas.component';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.scss'],
})
export class ListarTareasComponent implements OnInit {
  faTrash = faTrash;
  txtDescription!: FormControl;

  todos: Todo[] = [];
  loading: boolean = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Todo>;

  isActive: boolean = false;

  displayedColumns: string[] = [
    'action',
    'id',
    'titulo',
    'descripcion',
    'estado',
  ];
  dataSource!: MatTableDataSource<Todo>;
  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private Todoservice: TodosService,
    private messageService: MessageControlService,

  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos = () => {
    this.Todoservice.getTodos().subscribe({
      next: (response: ResponseCustom<Todo[]>) => {
        if (this.dataSource) {
          this.dataSource.data = response.value; 
        } else {
          this.dataSource = new MatTableDataSource(response.value);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
  
      },
      error: () => console.error('Ocurrió un error'),
    });
  };
  

  

  onUpdate(todo: Todo): void {

    const dialogRef = this.dialog.open(RegisterTareasComponent, {
      width: '400px',
      data : {todo, update : true}
    });
  
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
            await this.getTodos();
            const randomElementIndex = Math.floor(Math.random() * this.todos.length);
            this.dataSource.data.push(this.todos[randomElementIndex]);
            this.table.renderRows();
        }
      })
  }

  onDeleted(todo: Todo): void {
    const dialogRef = this.dialog.open(DialogResponseComponent, {
      disableClose: true,
      data: { ...todo, message: 'Desea eliminar la tarea ' },
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.Todoservice.deleteProduct(todo.id.toString()).subscribe({
          next: (response) => {},
          complete: () => {
            this.getTodos();
            this.messageService.ShowSuccess('Se elimino Correctamente');
          },
          error: () => this.messageService.ShowError('Ocurrio un error'),
        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterTareasComponent, {
      width: '400px',
      data : { update : false}
    });
  
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
            await this.getTodos();
            const randomElementIndex = Math.floor(Math.random() * this.todos.length);
            this.dataSource.data.push(this.todos[randomElementIndex]);
            this.table.renderRows();
        }
      })
    };
  

  
  onSendNotifications() {}
}
