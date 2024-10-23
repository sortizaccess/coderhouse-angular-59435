import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { map, Observable, of } from 'rxjs';
import { generarIdRandom } from '../../shared/utils';

export let DATABASE: Alumno[] = [
  new Alumno(254084299, 'Juan', 'Pérez', 'jperez@gmail.com', new Date('2000-05-20'), 'Masculino'),
  new Alumno(322063478, 'Ana', 'Gómez', 'agomez@gmail.com', new Date('1999-03-15'), 'Femenino'),
  new Alumno(433056889, 'Luis', 'Fernández', 'lfernandez@gmail.com', new Date('2001-07-30'), 'Masculino'),
  new Alumno(747016311, 'María', 'López', 'mlopez@gmail.com', new Date('2000-12-10'), 'Femenino'),
  new Alumno(995023300, 'Carlos', 'Martínez', 'cmartinez@gmail.com', new Date('1998-11-22'), 'Masculino'),
];

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  getAlumnos(): Observable<Alumno[]> {
    return of([...DATABASE]);
  }

  getAlumno(legajo: number): Observable<Alumno | undefined> {
    return this.getAlumnos().pipe(map((alumnos) => alumnos.find((a) => a.legajo === legajo)));
  }

  eliminarAlumno(legajo: number): Observable<Alumno[]>{
    DATABASE = DATABASE.filter((a) => a.legajo != legajo);
    return this.getAlumnos();
  }

  modificarAlumno(legajo: number, modificar: Partial<Alumno>) {
    DATABASE = DATABASE.map((alumno) =>
      alumno.legajo === legajo ? { ...alumno, ...modificar } : alumno
    );
    return this.getAlumnos();
  }

  agregarAlumno(data: Omit<Alumno, 'legajo'>): Observable<Alumno[]> {
    DATABASE.push({ ...data, legajo: generarIdRandom() });
    return this.getAlumnos();
  }

  constructor() { }
}
