import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../../../core/models/curso';
import { provideNativeDateAdapter } from '@angular/material/core';

interface claseDialogData {
  claseModificada?: Curso
}

@Component({
  selector: 'app-crear-editar-clases',
  templateUrl: './crear-editar-clases.component.html',
  styleUrl: './crear-editar-clases.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class CrearEditarClasesComponent {
  public claseForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarClasesComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: claseDialogData) {
    this.claseForm = this.formBuilder.group({
      contenido: [null],
      aula: [null],
      profesor: [null]
    });

    this.patchFormValue();
  }

  private get esModificar() {
    return !!this.data?.claseModificada;
  }

  patchFormValue() {
    if(this.data?.claseModificada){
      this.claseForm.patchValue(this.data.claseModificada);
    }
  }

  onSave(): void {
    if (this.claseForm.invalid){
      this.claseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.claseForm.value,
        id: this.esModificar ? this.data!.claseModificada!.id : generarIdRandom()
      });
    }
  }
}
