import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class InscripcionesService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Inscripcion | undefined> {
    return this.httpClient.get<Inscripcion>(`${this.baseURL}/inscripciones/${id}`);
  }
  getAll(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(`${this.baseURL}/inscripciones`);
  }
  add(data: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(`${this.baseURL}/inscripciones`, { ...data });
  }  
  delete(id: string): Observable<Inscripcion[]>{
    return this.httpClient.delete<Inscripcion>(`${this.baseURL}/inscripciones/${id}`).pipe(concatMap(() => this.getAll()));
  }
  update(id: string, modificar: Partial<Inscripcion>) {
    return this.httpClient.patch(`${this.baseURL}/inscripciones/${id}`, modificar).pipe(concatMap(() => this.getAll()));
  }

  
  getAllByAlumno(idAlumno?: string): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(`${this.baseURL}/inscripciones?idAlumno=${idAlumno}`);
  }
}
