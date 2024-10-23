import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { generarIdRandom } from '../../shared/utils';
import { Inscripcion } from '../models/inscripcion';

export let DATABASE: Inscripcion[] = [
    new Inscripcion(1, 101, 501, new Date('2023-03-01'), 'Activo'),
    new Inscripcion(2, 102, 502, new Date('2023-05-15'), 'Completado'),
    new Inscripcion(3, 103, 503, new Date('2023-07-20'), 'Inactivo')
];


@Injectable({
  providedIn: 'root'
})

export class InscripcionesService {
  get(id: number): Observable<Inscripcion | undefined> {
    return this.getAll().pipe(map((x) => x.find((y) => y.id === id)));
  }

  getAll(): Observable<Inscripcion[]> {
    return of([...DATABASE]);
  }

  delete(id: number): Observable<Inscripcion[]>{
    DATABASE = DATABASE.filter((x) => x.id != id);
    return this.getAll();
  }

  update(id: number, modificar: Partial<Inscripcion>) {
    DATABASE = DATABASE.map((x) =>
      x.id === id ? { ...x, ...modificar } : x
    );
    return this.getAll();
  }

  add(data: Omit<Inscripcion, 'legajo'>): Observable<Inscripcion[]> {
    DATABASE.push({ ...data, id: generarIdRandom() });
    return this.getAll();
  }

  constructor() { }
}
