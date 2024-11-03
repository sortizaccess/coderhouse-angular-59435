import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Alumno } from '../../core/models/alumno';
import { AuthData } from '../../core/models/authData';
import { generarIdRandom } from '../../shared/utils';
import { Router } from '@angular/router';

const FAKE_USER: Alumno = {
  email: 'admin_test@email.com',
  legajo: generarIdRandom(),
  nombre: 'Sebastián',
  apellido: 'Ortiz',
  fechaNacimiento: new Date(2024, 12, 12),
  genero: 'Masculino',
  password: '1234',
  token: 'ASD123'
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authAlumno$ = new BehaviorSubject<null | Alumno>(null);
  public authAlumno$ = this._authAlumno$.asObservable();

  constructor(private router: Router){}

  login(data: AuthData): Observable<Alumno> {
    if (data.email != FAKE_USER.email || data.password != FAKE_USER.password) {
      return throwError(() => new Error('Acceso incorrecto'));
    }

    this._authAlumno$.next(FAKE_USER);
    localStorage.setItem('token', FAKE_USER.token);

    return of(FAKE_USER);
  }

  logout(): void {
    this._authAlumno$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth','login']);
  }

  validarToken(): Observable<boolean>{
    const esValido = localStorage.getItem('token') === FAKE_USER.token;

    if(esValido) {
      this._authAlumno$.next(FAKE_USER);
    }
    else {
      this._authAlumno$.next(null);
    }

    return of(esValido);
  }
}