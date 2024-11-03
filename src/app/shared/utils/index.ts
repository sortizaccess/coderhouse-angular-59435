import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Generar un ID aleatorio
export function generarIdRandom(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < 6; i++) { 
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return id;
}

// Permitir solo letras
export function soloLetras(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      const esValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(valor); 
  
      return esValido ? null : { soloLetras: true };
    };
}
  
