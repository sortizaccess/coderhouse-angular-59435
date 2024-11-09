import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Alumno } from '../../core/models/alumno';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private _authAlumno$ = new BehaviorSubject<null | Alumno>(null);
  public authAlumno$ = this._authAlumno$.asObservable();
  private baseURL = environment.apiBaseURL;
  constructor(private router: Router, private httpClient: HttpClient){}

  validarToken(): Observable<boolean>{
    return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos?token=${localStorage.getItem('token')}`)
    .pipe(map((alumnos) => {
      const alumno = this.autentificarToken(alumnos);
      return !alumno;
    }));
  }

  private autentificarToken(alumnos: Alumno[]): Alumno | null {
    if(alumnos[0]){
      localStorage.setItem('token', alumnos[0].token);
      this._authAlumno$.next(alumnos[0]);
      return alumnos[0];
    }
    else {
      return null;
    }
  }
}