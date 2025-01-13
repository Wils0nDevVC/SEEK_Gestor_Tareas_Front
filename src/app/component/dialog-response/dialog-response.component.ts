import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-response',
  templateUrl: './dialog-response.component.html',
  styleUrls: ['./dialog-response.component.scss']
})
export class DialogResponseComponent {

  name! : string
  message! : string

  constructor(
    public dialogRef: MatDialogRef<DialogResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.name = data.Name
      this.message = data.message
    }

    onNoClick():void{
      this.dialogRef.close(false);
    }
    onConfirm():void{
      this.dialogRef.close(true);
    }
}
