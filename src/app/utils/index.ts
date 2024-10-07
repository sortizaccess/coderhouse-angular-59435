// Falta validar que no se repitan los Ids
export function generarIdRandom(): number {
    return Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
}

import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

 // Permitir solo letras
export function soloLetras(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
     const valor = control.value;
     const esValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(valor); 
 
     return esValido ? null : { soloLetras: true };
   };
 }
 
  // Permitir solo letras
export function soloNumerosLetras(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      const esValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9_-]+$/.test(valor);
  
      return esValido ? null : { soloNumerosLetras: true };
    };
}