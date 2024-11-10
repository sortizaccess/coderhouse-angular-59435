import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Alumno } from '../../core/models/alumno';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../store/selectors/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showFiller = false;
  authAlumno$: Observable<Alumno | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
  }

  logout(): void {
    this.authService.logout();
  }
}

