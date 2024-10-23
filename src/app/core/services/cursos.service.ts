import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Curso } from '../models/curso';
import { generarIdRandom } from '../../shared/utils';

export let DATABASE: Curso[] = [
  new Curso(991, 'Introducción a la Programación', 'Curso básico para aprender los fundamentos de la programación.', new Date('2024-01-15'), 'Principiante', 5),
  new Curso(992, 'JavaScript Avanzado', 'Aprende técnicas avanzadas de desarrollo con JavaScript.', new Date('2024-02-20'), 'Avanzado', 4),
  new Curso(993, 'Diseño de Bases de Datos', 'Diseño y normalización de bases de datos relacionales.', new Date('2024-03-10'), 'Intermedio', 3),
  new Curso(994, 'Fundamentos de Redes', 'Conceptos básicos de redes y protocolos de comunicación.', new Date('2024-04-05'), 'Principiante', 2),
  new Curso(995, 'Machine Learning', 'Introducción al aprendizaje automático y sus aplicaciones.', new Date('2024-05-01'), 'Avanzado', 1)
];


@Injectable({
  providedIn: 'root'
})

export class CursosService {
  get(id: number): Observable<Curso | undefined> {
    return this.getAll().pipe(map((x) => x.find((y) => y.id === id)));
  }

  getAll(): Observable<Curso[]> {
    return of([...DATABASE]);
  }

  delete(id: number): Observable<Curso[]>{
    DATABASE = DATABASE.filter((x) => x.id != id);
    return this.getAll();
  }

  update(id: number, modificar: Partial<Curso>) {
    DATABASE = DATABASE.map((x) =>
      x.id === id ? { ...x, ...modificar } : x
    );
    return this.getAll();
  }

  add(data: Omit<Curso, 'legajo'>): Observable<Curso[]> {
    DATABASE.push({ ...data, id: generarIdRandom() });
    return this.getAll();
  }

  constructor() { }
}
