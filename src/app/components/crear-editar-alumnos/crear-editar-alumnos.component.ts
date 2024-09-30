import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { merge } from 'rxjs';

@Component({
  selector: 'app-crear-editar-alumnos',
  templateUrl: './crear-editar-alumnos.component.html',
  styleUrl: './crear-editar-alumnos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class CrearEditarAlumnosComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Requerido');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Email inválido');
    } else {
      this.errorMessage.set('');
    }
  }


  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 40, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

}
