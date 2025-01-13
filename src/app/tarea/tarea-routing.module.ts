import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTareasComponent } from './pages/register-tareas/register-tareas.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ListarTareasComponent } from './pages/listar-tareas/listar-tareas.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path : '', component : ListarTareasComponent},
      {path:'register', component:RegisterTareasComponent}
    ],

    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareaRoutingModule { }
