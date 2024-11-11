import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Alumno } from '../../../core/models/alumno';
import { generarIdRandom } from '../../../shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  alumno?: Alumno;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      this.authService.register(this.registerForm.value);
      this.authService.login(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'home']);
        },
        error: (err) => {
          alert(err.message);
        }
      });
    }
  }
}
