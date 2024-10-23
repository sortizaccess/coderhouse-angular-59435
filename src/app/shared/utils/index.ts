import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Generar un ID aleatorio
export function generarIdRandom(): number {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 999;
}

// Permitir solo letras
export function soloLetras(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      const esValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(valor); 
  
      return esValido ? null : { soloLetras: true };
    };
}
  
