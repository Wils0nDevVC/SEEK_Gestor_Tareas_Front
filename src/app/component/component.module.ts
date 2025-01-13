import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertValidateComponent } from './alert-validate/alert-validate.component';



@NgModule({
  declarations: [
    AlertValidateComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  exports: [
    FontAwesomeModule,
    AlertValidateComponent
  ]
})
export class ComponentModule { }
