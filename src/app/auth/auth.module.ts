import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '../component/component.module';
import { AuthComponent } from './pages/auth.component';
import { HttpClientModule } from '@angular/common/http'; // Importamos HttpClientModule para las peticiones HTTP

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    HttpClientModule // Asegúrate de importar HttpClientModule
  ],
  exports: []
})
export class AuthModule { }
