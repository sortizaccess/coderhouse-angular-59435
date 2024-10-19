import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitulos]'
})
export class TitulosDirective {
  constructor(private el: ElementRef<HTMLElement>){
    this.applyStyles();
  }

  applyStyles(): void {
    this.el.nativeElement.style.fontSize = '20px';
    this.el.nativeElement.style.fontFamily = 'Lato';
    this.el.nativeElement.style.fontWeight = '300';
  }
}
