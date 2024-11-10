import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CursosService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.baseURL}/cursos/${id}`);
  }
  getAll(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${this.baseURL}/cursos`);
  }
  add(data: Omit<Curso, 'id'>): Observable<Curso> {
    return this.httpClient.post<Curso>(`${this.baseURL}/cursos`, { ...data });
  }  
  delete(id: string): Observable<Curso[]>{
    return this.httpClient.delete<Curso>(`${this.baseURL}/cursos/${id}`).pipe(concatMap(() => this.getAll()));
  }
  update(id: string, modificar: Partial<Curso>) {
    return this.httpClient.patch(`${this.baseURL}/cursos/${id}`, modificar).pipe(concatMap(() => this.getAll()));
  }

}
