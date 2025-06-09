import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDestaque]',
  standalone:false
  
  
})
export class DestaqueDirective {

  

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    
    this.el.nativeElement.style.backgroundColor = '#e0e0e0'; 
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }

  @HostListener('mouseleave') onMouseLeave() {
   
    this.el.nativeElement.style.backgroundColor = 'white'; 
  }
}