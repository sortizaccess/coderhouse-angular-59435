import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { SharedModule } from '../../../../shared/shared.module';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { ListarInscripcionesComponent } from './listar-inscripciones.component';
import { Inscripcion } from '../../../../core/models/inscripcion';


describe('ListarInscripcionesComponent', () => {
    let inscripcionesService: InscripcionesService;
    let httpController: HttpTestingController;

    let component: ListarInscripcionesComponent;
    let fixture: ComponentFixture<ListarInscripcionesComponent>;
    let toast: ToastsComponent;
  
    const mockInscripcion: Inscripcion[] = [
      {
          id: '1',
          idAlumno: '1',
          idCurso: '1',
          fechaInscripcion: new Date,
          estado: 'TEST_2'
      },
      {
          id: '2',
          idAlumno: '1',
          idCurso: '1',
          fechaInscripcion: new Date,
          estado: 'TEST_2'
      }
    ];
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideHttpClientTesting(), InscripcionesService, ToastsComponent],
        declarations: [ListarInscripcionesComponent],
        imports: [SharedModule, HttpClientTestingModule],
      }).compileComponents();
      inscripcionesService = TestBed.inject(InscripcionesService);
      httpController = TestBed.inject(HttpTestingController);

      fixture = TestBed.createComponent(ListarInscripcionesComponent);
      component = fixture.componentInstance;
    });
  
    // LISTAR
    it('Debe listar las inscripciones y asignarlos al dataSource', () => {
      component.listarInscripciones();
  
      const req = httpController.expectOne(`${inscripcionesService['baseURL']}/inscripciones`);
      req.flush(mockInscripcion);
  
      expect(component.dataSource).toEqual(mockInscripcion);
    });
  
});
  