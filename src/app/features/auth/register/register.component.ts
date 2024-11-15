import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { generarIdRandom } from '../../../shared/utils';
import { Usuario } from '../../../core/models/usuario';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      nombre: [null, [Validators.required, Validators.minLength(4)]],
      apellido: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]]
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

        localStorage.setItem('token', usuarioData.token);  
        this.usuariosService.add(usuarioData).subscribe({ next: () => this.router.navigate(['dashboard', 'home']) });
      } 
    }
  }


}
