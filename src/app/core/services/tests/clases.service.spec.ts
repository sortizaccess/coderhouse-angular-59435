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

});

