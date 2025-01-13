import { cargarProductos } from './../../../core/ngrx/products/product.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseComponent } from 'src/app/component/dialog-response/dialog-response.component';
import { MessageControlService } from 'src/app/shared/services/message-control.service';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.scss']
})
export class ListarTareasComponent implements OnInit {

  faTrash = faTrash;
  txtDescription!: FormControl;

  productos: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatTable) table!: MatTable<Product>;

   isActive : boolean = false

   displayedColumns: string[] = [
    'Nombre',
    'Descripción',
    'Precio',
    'Cantidad de Inventario'
  ];
  dataSource!: MatTableDataSource<Product>;
  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private messageControlService : MessageControlService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts = ()=> {
    this.productService.getProducts()
    .subscribe({
      next:(response: any)=>{
       this.productos = response?.Data

       this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

       console.log( this.productos)
      },
      complete : ()=> {
        console.log('completado')
      },
      error: ()=> console.error('Ocurrio un error')
    })
  }

  onUpdate(product: any): void {
    // Aquí iría la lógica para actualizar el producto
  }

  onDeleted(product: Product): void {
    
    const dialogRef = this.dialog.open(DialogResponseComponent, {
      disableClose: true,
      data : {...product, message:'Desea eliminar el Producto'},
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) {

        this.productService.deleteProduct(product).subscribe({
          next : (response)=>{
          },
          complete: ()=>{
            this.getProducts()
            this.messageControlService.ShowSuccess('Se elimino Correctamente')
          },
          error: ()=> this.messageControlService.ShowError('Ocurrio un error')
        })
      }
    });

  }
  onSendNotifications(){

  }
}
