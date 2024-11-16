import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CursosService } from '../../../../core/services/cursos.service';
import { ListarCursosComponent } from './listar-cursos.component';
import { Curso } from '../../../../core/models/curso';




describe('ListarCursosComponent', () => {
    let cursosService: CursosService;
    let httpController: HttpTestingController;

    let component: ListarCursosComponent;
    let fixture: ComponentFixture<ListarCursosComponent>;
    let toast: ToastsComponent;
  
    const mockCursos: Curso[] = [
      {
          id: '1',
          nombre: 'TEST_1',
          descripcion: 'TEST_1',
          fechaInicio: new Date,
          dificultad: 'TEST_1'
      },
      {
          id: '2',
          nombre: 'TEST_2',
          descripcion: 'TEST_2',
          fechaInicio: new Date,
          dificultad: 'TEST_2'
      }
    ];
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideHttpClientTesting(), CursosService, ToastsComponent],
        declarations: [ListarCursosComponent],
        imports: [SharedModule, HttpClientTestingModule],
      }).compileComponents();
      cursosService = TestBed.inject(CursosService);
      httpController = TestBed.inject(HttpTestingController);

      fixture = TestBed.createComponent(ListarCursosComponent);
      component = fixture.componentInstance;
    });
  
    // LISTAR
    it('Debe listar los cursos y asignarlos al dataSource', () => {
      component.listarCursos();
  
      const req = httpController.expectOne(`${cursosService['baseURL']}/cursos`);
      req.flush(mockCursos);
  
      expect(component.dataSource).toEqual(mockCursos);
    });
  
});
  