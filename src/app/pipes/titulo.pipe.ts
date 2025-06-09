import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titulo',
  standalone: false
})
export class TituloPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}