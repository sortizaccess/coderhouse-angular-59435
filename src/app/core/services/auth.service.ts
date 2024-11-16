import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { AuthData } from '../../core/models/authData';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/actions/auth.actions';
import { Usuario } from '../models/usuario';
import { selectUsuarioAutenticado } from '../../store/selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUsuario$: Observable<Usuario | null>;
  private baseURL = environment.apiBaseURL;
  
  constructor(private router: Router, private httpClient: HttpClient, private store: Store){
    this.authUsuario$ = this.store.select(selectUsuarioAutenticado);
  }

  login(data: AuthData): Observable<Usuario> {
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios?email=${data.email}&password=${data.password}`)
    .pipe(map((usuarios) => {
      const usuario = this.autentificarToken(usuarios);
      if (usuario) {
        return usuario
      }
      else {
        throw throwError(() => new Error('Acceso incorrecto'));
      }
    }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutUsuario());
    localStorage.removeItem('token');
    this.router.navigate(['auth','login']);
  }

  validarToken(): Observable<boolean>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios?token=${localStorage.getItem('token')}`)
    .pipe(map((usuarios) => {
      const usuario = this.autentificarToken(usuarios);
      return !!usuario;
    }));
  }

  autentificarToken(usuarios: Usuario[]): Usuario | null {
    if(usuarios[0]){
      this.store.dispatch(AuthActions.loginUsuario({ usuario: usuarios[0] }));
      localStorage.setItem('token', usuarios[0].token);      
      return usuarios[0];
    }
    else {
      return null;
    }
  }
}