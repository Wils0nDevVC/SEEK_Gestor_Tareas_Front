import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { tareaReducer } from './core/ngrx/tareas/tarea.reducer';
import { usuarioReducer } from './core/ngrx/usuario/usuario.reducer';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environments.prod';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioEffects } from './core/ngrx/usuario/effects/usuario.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule, // Aquí es donde debes agregarlo
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ tarea: tareaReducer, usuario : usuarioReducer }),
    EffectsModule.forRoot([UsuarioEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
      autoPause: true,
      trace: false, 
      traceLimit: 75, 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
