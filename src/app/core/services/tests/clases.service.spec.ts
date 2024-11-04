import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationExtras, Router } from '@angular/router';

import { Clase } from '../../models/clase';
import { ClasesService } from '../clases.service';

const mockClase: Clase = {
    id: "CL001",
    contenido: "Matemáticas Avanzadas",
    profesor: "Dr. Juan Pérez",
    aula: "Aula 101"
};


describe('ClasesService', () => {
  let service: ClasesService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClasesService
      ],
    });

    service = TestBed.inject(ClasesService);
    httpContoller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  // ADD
  it('Debe enviar una clase para el alta', (done) => {
    service.add(mockClase).subscribe({
        next: (clase) => {
          expect(clase).toEqual(mockClase);  
          done();
        }
      });
    
      const mockRequest = httpContoller.expectOne({
        url: `${service['baseURL']}clases`,
        method: 'POST',
      });

      mockRequest.flush(mockClase);  
      httpContoller.verify();
  });

  // DELETE
  it('Debe eliminar una clase y devolver un array de clases sin la clase eliminada', (done) => {
    const clasesRestantes: Clase[] = [];

    service.delete(mockClase.id).subscribe({
      next: (clasesDevueltas) => {
        expect(clasesDevueltas).not.toContain(mockClase); 
        expect(clasesDevueltas).toEqual(clasesRestantes); 
        done();
      }
    });
  
    const reqDelete = httpContoller.expectOne({
      url: `${service['baseURL']}clases/${mockClase.id}`,
      method: 'DELETE',
    });
    reqDelete.flush(null);

    const reqGet = httpContoller.expectOne(`${service['baseURL']}clases`);
    reqGet.flush(clasesRestantes); 
  
    httpContoller.verify();
  });
  
  // UPDATE
  it('Debe actualizar una clase y devolver un array de clases con la clase modificada', (done) => {
    const updatedClase: Clase = { ...mockClase, contenido: 'Programación_TEST' };
    const clasesActualizadas: Clase[] = [updatedClase]; 
  
    service.update(updatedClase.id, updatedClase).subscribe({
      next: (clasesDevueltas) => {
        expect(clasesDevueltas).toContain(updatedClase);
        expect(clasesDevueltas).toEqual(clasesActualizadas); 
        done();
      }
    });
  
    const reqPatch = httpContoller.expectOne({
      url: `${service['baseURL']}clases/${updatedClase.id}`,
      method: 'PATCH',
    });
    reqPatch.flush(updatedClase); 
  
    const reqGet = httpContoller.expectOne(`${service['baseURL']}clases`);
    reqGet.flush(clasesActualizadas); 
  
    httpContoller.verify(); 
  });

});

