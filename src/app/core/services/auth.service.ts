import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { Alumno } from '../../core/models/alumno';
import { AuthData } from '../../core/models/authData';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../store/selectors/auth.selector';
import { AuthActions } from '../../store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authAlumno$: Observable<Alumno | null>;
  private baseURL = environment.apiBaseURL;
  
  constructor(private router: Router, private httpClient: HttpClient, private store: Store){
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
  }

  login(data: AuthData): Observable<Alumno> {
    return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos?email=${data.email}&password=${data.password}`)
    .pipe(map((alumnos) => {
      const alumno = this.autentificarToken(alumnos);
      if (alumno) {
        return alumno
      }
      else {
        throw throwError(() => new Error('Acceso incorrecto'));
      }
    }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutAlumno());
    localStorage.removeItem('token');
    this.router.navigate(['auth','login']);
  }

  validarToken(): Observable<boolean>{
    return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos?token=${localStorage.getItem('token')}`)
    .pipe(map((alumnos) => {
      const alumno = this.autentificarToken(alumnos);
      return !!alumno;
    }));
  }

  private autentificarToken(alumnos: Alumno[]): Alumno | null {
    if(alumnos[0]){
      this.store.dispatch(AuthActions.loginAlumno({ alumno: alumnos[0] }));
      localStorage.setItem('token', alumnos[0].token);      
      return alumnos[0];
    }
    else {
      return null;
    }
  }
}