import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Clase } from '../models/clase';
import { generarIdRandom } from '../../shared/utils';

export let DATABASE: Clase[] = [
  new Clase(1, 'Matemáticas', { nombre: 'Juan', apellido: 'Pérez', fechaNacimiento: new Date('1980-05-10'), genero: 'Masculino' }, 'Aula 101'),
  new Clase(2, 'Física', { nombre: 'María', apellido: 'López', fechaNacimiento: new Date('1975-03-22'), genero: 'Femenino' }, 'Aula 202'),
  new Clase(3, 'Química', { nombre: 'Carlos', apellido: 'González', fechaNacimiento: new Date('1982-08-15'), genero: 'Masculino' }, 'Aula 303'),
  new Clase(4, 'Historia', { nombre: 'Laura', apellido: 'Fernández', fechaNacimiento: new Date('1978-11-30'), genero: 'Femenino' }, 'Aula 404'),
  new Clase(5, 'Literatura', { nombre: 'Jorge', apellido: 'Ramírez', fechaNacimiento: new Date('1985-01-25'), genero: 'Masculino' }, 'Aula 505')
];

@Injectable({
  providedIn: 'root'
})

export class ClasesService {
  getAll(): Observable<Clase[]> {
    return of([...DATABASE]);
  }

  delete(id: number): Observable<Clase[]>{
    DATABASE = DATABASE.filter((x) => x.id != id);
    return this.getAll();
  }

  update(id: number, modificar: Partial<Clase>) {
    DATABASE = DATABASE.map((x) =>
      x.id === id ? { ...x, ...modificar } : x
    );
    return this.getAll();
  }

  add(data: Omit<Clase, 'legajo'>): Observable<Clase[]> {
    DATABASE.push({ ...data, id: generarIdRandom() });
    return this.getAll();
  }

  constructor() { }
}
