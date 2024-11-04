import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavigationExtras, Router } from '@angular/router';
import { Alumno } from '../../models/alumno';
import { AuthData } from '../../models/authData';
import { AuthService } from '../auth.service';

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

const mockAuthData: AuthData = {
  email: 'admin_test@email.com',
  password: '1234',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService
      ],
    });

    service = TestBed.inject(AuthService);
    httpContoller = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizarse el login y debe establecer el token en localStorage', (done) => {
    service.login(mockAuthData).subscribe({
      next: (alumno) => {
        expect(alumno).toEqual(mockAlumno);
        expect(localStorage.getItem('token')).toEqual(mockAlumno.token);
        done();
      },
    });

    const mockRequest = httpContoller.expectOne({
      url: `${service['baseURL']}alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });

    mockRequest.flush([mockAlumno]);
  });
});

