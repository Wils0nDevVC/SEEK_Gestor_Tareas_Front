

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  messageError(error:HttpErrorResponse) {
    return throwError(() => `Ocurrio un Erro ${error} `)
  }
}
