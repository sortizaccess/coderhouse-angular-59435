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


describe('AlumnosService', () => {
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

});

