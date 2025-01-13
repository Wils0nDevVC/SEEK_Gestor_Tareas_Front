import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-validate',
  templateUrl: './alert-validate.component.html',
  styleUrls: ['./alert-validate.component.scss']
})
export class AlertValidateComponent {
  @Input() message : string = ''
  @Input() error : boolean = false
 }
