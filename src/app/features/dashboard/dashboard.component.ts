import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Alumno } from '../../core/models/alumno';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showFiller = false;
  authAlumno$: Observable<Alumno | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.authAlumno$ = this.authService.authAlumno$
  }

  logout(): void {
    this.authService.logout();
  }
}

