import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationExtras, Router } from '@angular/router';

import { InscripcionesService } from '../inscripciones.service';
import { Inscripcion } from '../../models/inscripcion';

const mockInscripcion: Inscripcion = {
    id: "INS001",
    idAlumno: '101',
    idCurso: '1',
    fechaInscripcion: new Date(),
    estado: "Confirmada"
  };

describe('InscripcionesService', () => {
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

  // ADD 
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

  // DELETE
  it('Debe eliminar una inscripcion y devolver un array de inscripciones sin la inscripcion eliminada', (done) => {
    const inscripcionesRestantes: Inscripcion[] = [];

    service.delete(mockInscripcion.id).subscribe({
      next: (inscripcionesDevueltas) => {
        expect(inscripcionesDevueltas).not.toContain(mockInscripcion); 
        expect(inscripcionesDevueltas).toEqual(inscripcionesRestantes); 
        done();
      }
    });
  
    const reqDelete = httpContoller.expectOne({
      url: `${service['baseURL']}inscripciones/${mockInscripcion.id}`,
      method: 'DELETE',
    });
    reqDelete.flush(null);

    const reqGet = httpContoller.expectOne(`${service['baseURL']}inscripciones`);
    reqGet.flush(inscripcionesRestantes); 
  
    httpContoller.verify();
  });
  
  // UPDATE
  it('Debe actualizar una inscripcion y devolver un array de inscripciones con la inscripcion modificada', (done) => {
    const updatedInscripcion: Inscripcion = { ...mockInscripcion, estado: 'Estado_TEST' };
    const inscripcionesActualizadas: Inscripcion[] = [updatedInscripcion]; 
  
    service.update(updatedInscripcion.id, updatedInscripcion).subscribe({
      next: (inscripcionesDevueltas) => {
        expect(inscripcionesDevueltas).toContain(updatedInscripcion);
        expect(inscripcionesDevueltas).toEqual(inscripcionesActualizadas); 
        done();
      }
    });
  
    const reqPatch = httpContoller.expectOne({
      url: `${service['baseURL']}inscripciones/${updatedInscripcion.id}`,
      method: 'PATCH',
    });
    reqPatch.flush(updatedInscripcion); 
  
    const reqGet = httpContoller.expectOne(`${service['baseURL']}inscripciones`);
    reqGet.flush(inscripcionesActualizadas); 
  
    httpContoller.verify(); 
  });

});

