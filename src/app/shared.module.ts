import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MaiusculaPipe } from './pipes/maiuscula.pipe';
import { TituloPipe } from './pipes/titulo.pipe';
import { DestaqueDirective } from './directives/destaque.directive';

@NgModule({
  declarations: [
    MaiusculaPipe,
    TituloPipe,
    DestaqueDirective
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MaiusculaPipe,
    TituloPipe,
    DestaqueDirective,
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }