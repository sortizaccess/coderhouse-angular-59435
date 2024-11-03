import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Clase } from '../models/clase';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ClasesService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Clase | undefined> {
    return this.httpClient.get<Clase>(`${this.baseURL}clases/${id}`);
  }
  getAll(): Observable<Clase[]> {
    return this.httpClient.get<Clase[]>(`${this.baseURL}clases`);
  }
  add(data: Omit<Clase, 'id'>): Observable<Clase> {
    return this.httpClient.post<Clase>(`${this.baseURL}clases`, { ...data });
  }  
  delete(id: string): Observable<Clase[]>{
    return this.httpClient.delete<Clase>(`${this.baseURL}clases/${id}`).pipe(concatMap(() => this.getAll()));
  }
  update(id: string, modificar: Partial<Clase>) {
    return this.httpClient.patch(`${this.baseURL}clases/${id}`, modificar).pipe(concatMap(() => this.getAll()));
  }

}
