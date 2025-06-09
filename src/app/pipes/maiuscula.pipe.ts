import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maiuscula',
  standalone:false
  
  
})
export class MaiusculaPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.toUpperCase();
  }

}