import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ClasesService } from '../../../../core/services/clases.service';
import { ListarClasesComponent } from './listar-clases.component';
import { Clase } from '../../../../core/models/clase';


describe('ListarClasesComponent', () => {
    let clasesService: ClasesService;
    let httpController: HttpTestingController;

    let component: ListarClasesComponent;
    let fixture: ComponentFixture<ListarClasesComponent>;
    let toast: ToastsComponent;
  
    const mockClases: Clase[] = [
      {
        id: '1',
        contenido: 'TEST_1',
        profesor: 'TEST_1',
        aula: 'TEST_1'
      },
      {
        id: '2',
        contenido: 'TEST_2',
        profesor: 'TEST_2',
        aula: 'TEST_2'
      }
    ];
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideHttpClientTesting(), ClasesService, ToastsComponent],
        declarations: [ListarClasesComponent],
        imports: [SharedModule, HttpClientTestingModule],
      }).compileComponents();
      clasesService = TestBed.inject(ClasesService);
      httpController = TestBed.inject(HttpTestingController);

      fixture = TestBed.createComponent(ListarClasesComponent);
      component = fixture.componentInstance;
    });
  
    // LISTAR
    it('Debe listar las clases y asignarlas al dataSource', () => {
      component.listarClases();
  
      const req = httpController.expectOne(`${clasesService['baseURL']}/clases`);
      req.flush(mockClases);
  
      expect(component.dataSource).toEqual(mockClases);
    });
  
});
  