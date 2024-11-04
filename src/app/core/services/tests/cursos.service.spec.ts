import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationExtras, Router } from '@angular/router';

import { CursosService } from '../cursos.service';
import { Curso } from '../../models/curso';

const mockCurso: Curso = {
    id: "CRS001",
    nombre: "Programación I",
    descripcion: "Curso básico de programación orientado a principiantes.",
    fechaInicio: new Date(),
    dificultad: "Principiante"
  };


describe('CursosService', () => {
  let service: CursosService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CursosService
      ],
    });

    service = TestBed.inject(CursosService);
    httpContoller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  // ADD
  it('Debe enviar un curso para el alta', (done) => {
    service.add(mockCurso).subscribe({
        next: (curso) => {
          expect(curso).toEqual(mockCurso);  
          done();
        }
      });
    
      const mockRequest = httpContoller.expectOne({
        url: `${service['baseURL']}cursos`,
        method: 'POST',
      });

      mockRequest.flush(mockCurso);  
      httpContoller.verify();
  });

  // DELETE
  it('Debe eliminar un curso y devolver un array de cursos sin el curso eliminado', (done) => {
    const cursosRestantes: Curso[] = [];

    service.delete(mockCurso.id).subscribe({
      next: (cursosDevueltos) => {
        expect(cursosDevueltos).not.toContain(mockCurso); 
        expect(cursosDevueltos).toEqual(cursosRestantes); 
        done();
      }
    });
  
    const reqDelete = httpContoller.expectOne({
      url: `${service['baseURL']}cursos/${mockCurso.id}`,
      method: 'DELETE',
    });
    reqDelete.flush(null);

    const reqGet = httpContoller.expectOne(`${service['baseURL']}cursos`);
    reqGet.flush(cursosRestantes); 
  
    httpContoller.verify();
  });
  
  // UPDATE
  it('Debe actualizar un alumno y devolver un array de Alumnos con el modificado', (done) => {
    const updatedCurso: Curso = { ...mockCurso, nombre: 'Curso_TEST' };
    const cursosActualizados: Curso[] = [updatedCurso]; 
  
    service.update(updatedCurso.id, updatedCurso).subscribe({
      next: (cursosDevueltos) => {
        expect(cursosDevueltos).toContain(updatedCurso);
        expect(cursosDevueltos).toEqual(cursosActualizados); 
        done();
      }
    });
  
    const reqPatch = httpContoller.expectOne({
      url: `${service['baseURL']}cursos/${updatedCurso.id}`,
      method: 'PATCH',
    });
    reqPatch.flush(updatedCurso); 
  
    const reqGet = httpContoller.expectOne(`${service['baseURL']}cursos`);
    reqGet.flush(cursosActualizados); 
  
    httpContoller.verify(); 
  });

});

