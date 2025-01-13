import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertValidateComponent } from './alert-validate/alert-validate.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaterialModule } from '../material/material.module';
import { DialogResponseComponent } from './dialog-response/dialog-response.component';



@NgModule({
  declarations: [
    AlertValidateComponent,
    SnackbarComponent,
    DialogResponseComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    FontAwesomeModule,
    AlertValidateComponent,
    SnackbarComponent
  ]
})
export class ComponentModule { }
