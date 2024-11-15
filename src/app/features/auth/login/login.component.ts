import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastsComponent } from '../../../shared/utils/toasts/toasts.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  @ViewChild(ToastsComponent) toast!: ToastsComponent; 
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    else {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'home']);
        },
        error: (err) => {
          this.toast.showError('Acceso incorrecto')
        }
      });
    }
  }

}
