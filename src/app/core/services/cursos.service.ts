import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from '../models/curso';
import { generarIdRandom } from '../../shared/utils';

export let DATABASE: Curso[] = [
  new Curso(1, 'Introducción a la Programación', 'Curso básico para aprender los fundamentos de la programación.', new Date('2024-01-15'), 'Principiante'),
  new Curso(2, 'JavaScript Avanzado', 'Aprende técnicas avanzadas de desarrollo con JavaScript.', new Date('2024-02-20'), 'Avanzado'),
  new Curso(3, 'Diseño de Bases de Datos', 'Diseño y normalización de bases de datos relacionales.', new Date('2024-03-10'), 'Intermedio'),
  new Curso(4, 'Fundamentos de Redes', 'Conceptos básicos de redes y protocolos de comunicación.', new Date('2024-04-05'), 'Principiante'),
  new Curso(5, 'Machine Learning', 'Introducción al aprendizaje automático y sus aplicaciones.', new Date('2024-05-01'), 'Avanzado')
];


@Injectable({
  providedIn: 'root'
})

export class CursosService {
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
