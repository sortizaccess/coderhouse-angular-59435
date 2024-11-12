import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno } from '../../../core/models/alumno';
import { generarIdRandom } from '../../../shared/utils';
import { AlumnosService } from '../../../core/services/alumnos.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      nombre: [null, [Validators.required, Validators.minLength(4)]],
      apellido: [null, [Validators.required, Validators.minLength(4)]],
      genero: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      if (this.registerForm.valid) {
        const alumnoData: Omit<Alumno, 'id'> = {
          nombre: this.registerForm.get('nombre')?.value,
          apellido: this.registerForm.get('apellido')?.value,
          genero: this.registerForm.get('genero')?.value,
          fechaNacimiento: this.registerForm.get('fechaNacimiento')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          token: generarIdRandom(),
          esAdmin: false
        };

        localStorage.setItem('token', alumnoData.token);  
        this.alumnosService.add(alumnoData).subscribe({ next: () => this.router.navigate(['dashboard', 'home']) });
      } 
    }
  }


}
