import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [provideHttpClientTesting()]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('El componente debe haber sido instanciado', () => {
    expect(component).toBeTruthy();
  });

  it('El email debe ser requerido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();
  });

  it('Al llamar onSubmit, si el form es invalido, debe marcar los campos como touched', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });

    const spyOnMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );

    component.onSubmit();
    expect(spyOnMarkAllAsTouched).toHaveBeenCalledTimes(1);
  });


  it('Al llamar onSubmit debe llamar a login de AuthService', () => {
    component.loginForm.setValue({
      email: 'test@email.com',
      password: '12345',
    });

    const spyOnLogin = spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(spyOnLogin).toHaveBeenCalled();
  });

});
