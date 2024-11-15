import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Usuario } from '../../core/models/usuario';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private _authUsuario$ = new BehaviorSubject<null | Usuario>(null);
  public authUsuario$ = this._authUsuario$.asObservable();
  private baseURL = environment.apiBaseURL;
  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService){}

  validarToken(): Observable<boolean>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios?token=${localStorage.getItem('token')}`)
    .pipe(map((usuarios) => {
      const usuario = this.authService.autentificarToken(usuarios);
      return !usuario;
    }));
  }

  esAdmin(): Observable<boolean>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios?token=${localStorage.getItem('token')}`)
    .pipe(map((usuarios) => {
      const usuario = this.authService.autentificarToken(usuarios);
      return !usuario?.esAdmin;
    }));
  }


}