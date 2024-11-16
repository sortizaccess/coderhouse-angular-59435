import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { generarIdRandom, soloLetras } from '../../../shared/utils';
import { Usuario } from '../../../core/models/usuario';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { ToastsComponent } from '../../../shared/utils/toasts/toasts.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  @ViewChild(ToastsComponent) toast!: ToastsComponent; 
  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15), soloLetras()]],
      apellido: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15), soloLetras()]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(45)]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      if (this.registerForm.valid) {
        const usuarioData: Omit<Usuario, 'id'> = {
          nombre: this.registerForm.get('nombre')?.value,
          apellido: this.registerForm.get('apellido')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          token: generarIdRandom(),
          esAdmin: false
        };

        this.usuariosService.getByEmail(usuarioData.email).subscribe({
          next: (usuario) => {
            if (usuario) {
              this.toast.showError('¡El email ya está registrado!')
            } else {
              localStorage.setItem('token', usuarioData.token);  
              this.usuariosService.add(usuarioData).subscribe({ next: () => this.router.navigate(['dashboard', 'home']) });
            }
          },
          error: (err) => {
            this.toast.showError('Error al verificar el email')
          }
        });
      }
    } 
  }
}
