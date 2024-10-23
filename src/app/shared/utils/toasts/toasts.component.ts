import { Component } from '@angular/core';
import Toast from 'bootstrap/js/dist/toast';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css'
})
export class ToastsComponent {

  confirmarToast(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const toastElement = document.getElementById('id-toast');
    
      if (toastElement) {
        const toast = new Toast(toastElement);
        toast.show();
    
        const actionButton = document.getElementById('take-action-btn');
        if (actionButton) {
          actionButton.addEventListener('click', () => {
            toast.hide();
            resolve(true);
            const toastElementSuccess = document.getElementById('id-toast-success');
            if (toastElementSuccess) {
              const toastSuccess = new Toast(toastElementSuccess);
              toastSuccess.show();
            }
          });
        } else {
          console.error('actionButton no encontrado en el DOM');
          reject(false);  //Si no se encuentra el boton, rechaza la promesa
        }
      } else {
        console.error('toast no encontrado en el DOM');
        reject(false);  //Si no se encuentra el toast, rechaza la promesa
      }
    });
  }

  show(): void {
    const toastElementSuccess = document.getElementById('id-toast-success');
    if (toastElementSuccess) {
      const toastSuccess = new Toast(toastElementSuccess);
      toastSuccess.show();
    }    
  }
}
