import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationExtras, Router } from '@angular/router';

import { InscripcionesService } from '../inscripciones.service';
import { Inscripcion } from '../../models/inscripcion';

const mockInscripcion: Inscripcion = {
    id: "INS001",
    idAlumno: 101,
    idCurso: 1,
    fechaInscripcion: new Date(),
    estado: "Confirmada"
  };

describe('AlumnosService', () => {
  let service: InscripcionesService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InscripcionesService
      ],
    });

    service = TestBed.inject(InscripcionesService);
    httpContoller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  it('Debe enviar una inscripcion para el alta', (done) => {
    service.add(mockInscripcion).subscribe({
        next: (inscripcion) => {
          expect(inscripcion).toEqual(mockInscripcion);  
          done();
        }
      });
    
      const mockRequest = httpContoller.expectOne({
        url: `${service['baseURL']}inscripciones`,
        method: 'POST',
      });

      mockRequest.flush(mockInscripcion);  
      httpContoller.verify();
  });

});

