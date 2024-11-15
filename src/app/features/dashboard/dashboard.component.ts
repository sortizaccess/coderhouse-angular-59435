import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUsuarioAutenticado } from '../../store/selectors/auth.selector';
import { Usuario } from '../../core/models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showFiller = false;
  authUsuario$: Observable<Usuario | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.authUsuario$ = this.store.select(selectUsuarioAutenticado);
  }

  logout(): void {
    this.authService.logout();
  }
}

