import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../shared/services/local-service.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core/interfaces';
import  * as actions from '../core/ngrx/usuario/usuario.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    private router : Router,
    private localService : LocalService,
    private store : Store<AppState>,
  ){}
  cerrarSesion(){
    this.localService.clearKey('user')
    this.localService.clearKey('token')
    this.store.dispatch( actions.LogoutUser() );
    this.router.navigate(['/login'])
  }
}
