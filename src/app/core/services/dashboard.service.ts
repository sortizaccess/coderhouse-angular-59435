import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Usuario } from '../../core/models/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private _authUsuario$ = new BehaviorSubject<null | Usuario>(null);
  public authUsuario$ = this._authUsuario$.asObservable();
  private baseURL = environment.apiBaseURL;
  constructor(private router: Router, private httpClient: HttpClient){}

  validarToken(): Observable<boolean>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios?token=${localStorage.getItem('token')}`)
    .pipe(map((usuarios) => {
      const usuario = this.autentificarToken(usuarios);
      return !usuario;
    }));
  }

  esAdmin(): Observable<boolean>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios?token=${localStorage.getItem('token')}`)
    .pipe(map((usuarios) => {
      const usuario = this.autentificarToken(usuarios);
      return !usuario?.esAdmin;
    }));
  }

  autentificarToken(usuarios: Usuario[]): Usuario | null {
    if(usuarios[0]){
      localStorage.setItem('token', usuarios[0].token);
      this._authUsuario$.next(usuarios[0]);
      return usuarios[0];
    }
    else {
      return null;
    }
  }
}