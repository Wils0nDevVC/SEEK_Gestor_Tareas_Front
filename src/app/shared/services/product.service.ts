import { ResponseCustom } from './../interfaces/response-custom.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';

import { LocalService } from './local-service.service';
import { environment } from 'src/environments/environments.prod';
import { EndPointBase } from '../constant';
import { ErrorService } from './error-control.service';
import { Todo } from 'src/app/core/interfaces/todo.interface';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private localService: LocalService, private httpError : ErrorService) {}

  getTodos(): Observable<ResponseCustom<Todo[]>> {

    const token = this.localService.getJsonValue('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<ResponseCustom<Todo[]>>(
      `${this.baseUrl + EndPointBase.Tareas }`,
      { headers }
    );
  }

  createTodo(todo : Todo): Observable<ResponseCustom<Todo>> {

    const token = this.localService.getJsonValue('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<ResponseCustom<Todo>>(
      `${this.baseUrl + EndPointBase.Tareas }`,{...todo},{ headers }
    );
  }

  updateTodo(id: string, estado: string): Observable<ResponseCustom<Todo>> {
    const token = this.localService.getJsonValue('token');
    console.log(`${this.baseUrl + EndPointBase.Tareas}/${id}/estado`)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.put<ResponseCustom<Todo>>(
      `${this.baseUrl + EndPointBase.Tareas}/${id}/estado`, 
      null, // No se envía un body, ya que el estado se pasa en la URL
      { 
        headers,
        params: { estado } // Enviamos el estado como query param
      }
    );
  }
  

  deleteProduct(id: string): Observable<any> {
    const token = this.localService.getJsonValue('token');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http
      .delete<any>(`${this.baseUrl + EndPointBase.Tareas}/${id}`, { headers }) // 🔹 Se envía el ID en la URL
      .pipe(retry(0), catchError(this.httpError.messageError));
  }
  
}
