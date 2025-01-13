import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AppState } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  
  constructor(
    private router: Router,
    private authService : AuthService,
    private store: Store<AppState>,

) {  }
  canActivate(  
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  boolean | Observable<boolean> {
    

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated ) ),
        tap( isAuthenticated => {
          if ( !isAuthenticated ) {
            this.router.navigate([`/login`])
          }
        })
    )
  }
}
