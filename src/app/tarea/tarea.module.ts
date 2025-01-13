import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareaRoutingModule } from './tarea-routing.module';
import { RegisterTareasComponent } from './pages/register-tareas/register-tareas.component';
import { ListarTareasComponent } from './pages/listar-tareas/listar-tareas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../component/component.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RegisterTareasComponent,
    ListarTareasComponent
  ],
  imports: [
    CommonModule,
    TareaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule
  ]
})
export class TareaModule { }
