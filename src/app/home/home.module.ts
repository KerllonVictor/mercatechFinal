import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxPaginationModule,
    SharedModule 
  ],
  declarations: [HomePage]
})
export class HomePageModule {}