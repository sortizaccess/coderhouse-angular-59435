import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { concatMap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Alumno> {
    return this.httpClient.get<Alumno>(`${this.baseURL}/alumnos/${id}`);
  }
  getAll(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos`);
  }
  add(data: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.httpClient.post<Alumno>(`${this.baseURL}/alumnos`, { ...data });
  }  
  delete(id: string): Observable<Alumno[]>{
    return this.httpClient.delete<Alumno>(`${this.baseURL}/alumnos/${id}`).pipe(concatMap(() => this.getAll()));
  }
  update(id: string, modificar: Partial<Alumno>) {
    return this.httpClient.patch(`${this.baseURL}/alumnos/${id}`, modificar).pipe(concatMap(() => this.getAll()));
  }

}
