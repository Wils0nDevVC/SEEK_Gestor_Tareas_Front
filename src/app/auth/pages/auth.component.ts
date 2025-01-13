import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../core/interfaces';
import { Usuario } from '../../core/models';
import { RefreshValid } from '../../shared/util';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import * as actions from './../../core/ngrx/usuario/usuario.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  newTaskDescription: string = '';
  menssage: string = 'Datos incorrectos';
  validateMessage: boolean = false;
  faRotate = faRotate
  isLogin: boolean = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
  ) {
    this.formLogin = new FormGroup({
      usuario: new FormControl(null, [Validators.required]),
      contrasena: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  sendLogin() {
    const { value, valid } = this.formLogin;

    if (valid) {
      this.isLogin = true;

      this.authService.loginUser(value.usuario, value.contrasena).subscribe({
        next: (data: Usuario) => {
          if (data.token) {
            setTimeout(() => {
              this.store.dispatch(actions.loginUsuario({ user: { ...data } }));
              this.router.navigate(['/tareas']);
              this.isLogin = false;

            }, 2000);
            this.validateMessage = false;
          } else {
            setTimeout(() => {
              this.isLogin = false;
              this.validateMessage = true;
            },1000)
          
          }
        },
      });
    } else {
      RefreshValid(this.formLogin);
    }
  }
}
