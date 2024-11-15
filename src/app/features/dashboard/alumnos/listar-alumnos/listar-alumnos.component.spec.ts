import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Alumno } from '../../../../core/models/alumno';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { ListarAlumnosComponent } from './listar-alumnos.component';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { SharedModule } from '../../../../shared/shared.module';


describe('ListarAlumnosComponent', () => {
    let alumnosService: AlumnosService;
    let httpController: HttpTestingController;

    let component: ListarAlumnosComponent;
    let toast: ToastsComponent;
    let fixture: ComponentFixture<ListarAlumnosComponent>;
  
    const mockAlumnos: Alumno[] = [
      {
          id: '1', 
          nombre: 'Juan Pérez',
          apellido: '',
          fechaNacimiento: new Date(),
          genero: ''
      },
      {
          id: '2', 
          nombre: 'María López',
          apellido: '',
          fechaNacimiento: new Date(),
          genero: ''
      }
    ];
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideHttpClientTesting(), AlumnosService, ToastsComponent],
        declarations: [ListarAlumnosComponent],
        imports: [SharedModule, HttpClientTestingModule],
      }).compileComponents();
      alumnosService = TestBed.inject(AlumnosService);
      httpController = TestBed.inject(HttpTestingController);

      fixture = TestBed.createComponent(ListarAlumnosComponent);
      component = fixture.componentInstance;
    });
  
    // LISTAR
    it('Debe listar los alumnos y asignarlos al dataSource', () => {
      component.listarAlumnos();
  
      const req = httpController.expectOne(`${alumnosService['baseURL']}alumnos`);
      req.flush(mockAlumnos);
  
      expect(component.dataSource).toEqual(mockAlumnos);
    });
  
    // ELIMINAR
    
    // it('Debe eliminar un alumno y actualizar dataSource cuando la eliminación es confirmada', () => {
    //     spyOn(component.toast, 'confirmarToast').and.returnValue(Promise.resolve(true));
        
    //     component.eliminarAlumno(mockAlumnos[0]);
      
    //     const reqDelete = httpController.expectOne(`${alumnosService['baseURL']}alumnos/${mockAlumnos[0].id}`);
    //     reqDelete.flush(mockAlumnos.slice(1)); 
      
    //     expect(component.dataSource).toEqual(mockAlumnos.slice(1));
    // });
      
    // MODIFICAR

    // it('Debe modificar un alumno y actualizar dataSource', () => {
    //   const alumnoModificado: Alumno = {
    //       id: '1', nombre: 'Juan Pérez Modificado',
    //       apellido: '',
    //       email: '',
    //       fechaNacimiento: new Date(),
    //       genero: '',
    //       password: '',
    //       token: ''
    //   };
    //   const alumnosActualizados = [alumnoModificado, mockAlumnos[1]];
  
    //   component.modificarAlumno(alumnoModificado.id, alumnoModificado);
  
    //   const reqPatch = httpController.expectOne(`${alumnosService['baseURL']}alumnos/${alumnoModificado.id}`);
    //   reqPatch.flush(alumnosActualizados); 
  
    //   expect(component.dataSource).toEqual(alumnosActualizados);
    // });
  });
  