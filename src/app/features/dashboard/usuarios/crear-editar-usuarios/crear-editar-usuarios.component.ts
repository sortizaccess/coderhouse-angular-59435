import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generarIdRandom, soloLetras } from '../../../../shared/utils';
import { Usuario } from '../../../../core/models/usuario';

interface usuarioDialogData {
  usuarioModificado?: Usuario
}

@Component({
  selector: 'app-crear-editar-usuarios',
  templateUrl: './crear-editar-usuarios.component.html',
  styleUrl: './crear-editar-usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})

export class CrearEditarUsuariosComponent {
  public usuarioForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarUsuariosComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: usuarioDialogData) {
    this.usuarioForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(3), soloLetras()]],
      apellido: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(3), soloLetras()]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(35)]],
      password: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]]
    });

    this.patchFormValue();
  }

  private get esModificar() {
    return !!this.data?.usuarioModificado;
  }

  patchFormValue() {
    if(this.data?.usuarioModificado){
      this.usuarioForm.patchValue(this.data.usuarioModificado);
    }
  }

  onSave(): void {
    if (this.usuarioForm.invalid){
      this.usuarioForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.usuarioForm.value,
        id: this.esModificar ? this.data!.usuarioModificado!.id : generarIdRandom(),
        token: this.esModificar ? this.data!.usuarioModificado!.token : generarIdRandom(),
        esAdmin: false
      });
    }
  }
}
