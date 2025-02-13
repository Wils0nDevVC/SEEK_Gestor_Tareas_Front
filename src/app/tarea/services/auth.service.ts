import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/interfaces';
import { Usuario } from '../../core/models';
import { v4 as uuidv4 } from 'uuid';
import { LocalService } from '../../shared/services/local-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments.prod';
import { EndPointBase, EndPointsAuth } from 'src/app/shared/constant';
import { ResponseCustom } from 'src/app/shared/interfaces/response-custom.interface';
import { AuthResponse } from 'src/app/auth/interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl = `${environment.apiBaseUrl}`; // URL del endpoint de autenticación en .NET

  constructor(
    private store: Store<AppState>,
    private localService: LocalService,
    private http: HttpClient
  ) {}

  loginUser(usuario: string, contrasena: string): Observable<Usuario> {
    const body = {
      "email": "corvas19@gmail.com",
      "password": "wilson12345"
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    

    return this.http.post<AuthResponse>(`${this.apiUrl + EndPointBase.Auth + EndPointsAuth.Login}`, body, { headers }).pipe(
      map((response) => {
        if (response) {
          const user: Usuario = {
            id: response.id,
            usuario: usuario,
            contrasena: "",
            token: response.token
          };

          // Guardamos el token y el usuario en el localStorage o cualquier almacenamiento persistente
          this.localService.setJsonValue('token', user.token);
          this.localService.setJsonValue('user', JSON.stringify(user));

          return user;
        } else {
          // Si la autenticación falla, retornamos un objeto vacío o un error
          throw new Error('Error de autenticación');
        }
      }),
      catchError((err) => {
        console.error(err);
        return of(new Usuario(0, '', '')); // Devuelve un usuario vacío en caso de error
      })
    );
  }

  checkAuthentication(): Observable<boolean> {
    const token: string = this.localService.getJsonValue('token');
    return of(token).pipe(
      map((token) => !!token), // Si el token existe, se considera autenticado
      catchError(() => of(false))
    );
  }
}
