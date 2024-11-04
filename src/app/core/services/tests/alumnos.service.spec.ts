import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { Alumno } from '../../models/alumno';
import { AlumnosService } from '../alumnos.service';

const mockAlumno: Alumno = {
  id: '123',
  nombre: 'Sebastián',
  apellido: 'Ortiz',
  email: 'admin_test@email.com',
  password: '1234',
  genero: 'Masculino',
  fechaNacimiento: new Date(),
  token: 'ASD123',
};

describe('AlumnosService', () => {
  let service: AlumnosService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlumnosService
      ],
    });

    service = TestBed.inject(AlumnosService);
    httpContoller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });


  // ADD
  it('Debe enviar un alumno para el alta', (done) => {
    service.add(mockAlumno).subscribe({
        next: (alumno) => {
          expect(alumno).toEqual(mockAlumno);  
          done();
        }
      });
    
      const mockRequest = httpContoller.expectOne({
        url: `${service['baseURL']}alumnos`,
        method: 'POST',
      });

      mockRequest.flush(mockAlumno);  
      httpContoller.verify();
  });

  // DELETE
  it('Debe eliminar un alumno y devolver un array de alumnos sin el alumno eliminado', (done) => {
    const alumnosRestantes: Alumno[] = [];

    service.delete(mockAlumno.id).subscribe({
      next: (alumnosDevueltos) => {
        expect(alumnosDevueltos).not.toContain(mockAlumno); 
        expect(alumnosDevueltos).toEqual(alumnosRestantes); 
        done();
      }
    });
  
    const reqDelete = httpContoller.expectOne({
      url: `${service['baseURL']}alumnos/${mockAlumno.id}`,
      method: 'DELETE',
    });
    reqDelete.flush(null);

    const reqGet = httpContoller.expectOne(`${service['baseURL']}alumnos`);
    reqGet.flush(alumnosRestantes); 
  
    httpContoller.verify();
  });
  
  // UPDATE
  it('Debe actualizar un alumno y devolver un array de alumnos con el alumno modificado', (done) => {
    const updatedAlumno: Alumno = { ...mockAlumno, nombre: 'Sebastián_TEST' };
    const alumnosActualizados: Alumno[] = [updatedAlumno]; 
  
    service.update(updatedAlumno.id, updatedAlumno).subscribe({
      next: (alumnosDevueltos) => {
        expect(alumnosDevueltos).toContain(updatedAlumno);
        expect(alumnosDevueltos).toEqual(alumnosActualizados); 
        done();
      }
    });
  
    const reqPatch = httpContoller.expectOne({
      url: `${service['baseURL']}alumnos/${updatedAlumno.id}`,
      method: 'PATCH',
    });
    reqPatch.flush(updatedAlumno); 
  
    const reqGet = httpContoller.expectOne(`${service['baseURL']}alumnos`);
    reqGet.flush(alumnosActualizados); 
  
    httpContoller.verify(); 
  });
  

});

