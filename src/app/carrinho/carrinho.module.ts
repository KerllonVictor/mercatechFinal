import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarrinhoPageRoutingModule } from './carrinho-routing.module';
import { CarrinhoPage } from './carrinho.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CarrinhoPageRoutingModule
  ],
  declarations: [CarrinhoPage]
})
export class CarrinhoPageModule {}