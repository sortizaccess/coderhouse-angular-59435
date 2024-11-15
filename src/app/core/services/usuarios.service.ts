import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseURL}/usuarios/${id}`);
  }
  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios`);
  }
  add(data: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseURL}/usuarios`, { ...data });
  }  
  delete(id: string): Observable<Usuario[]>{
    return this.httpClient.delete<Usuario>(`${this.baseURL}/usuarios/${id}`).pipe(concatMap(() => this.getAll()));
  }
  update(id: string, modificar: Partial<Usuario>) {
    return this.httpClient.patch(`${this.baseURL}/usuarios/${id}`, modificar).pipe(concatMap(() => this.getAll()));
  }

}
