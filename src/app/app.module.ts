import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Importe o SharedModule aqui
import { SharedModule } from './shared.module'; // Verifique o caminho se shared.module.ts não estiver em uma subpasta

@NgModule({
  declarations: [
    AppComponent,
    // Remova MaiusculaPipe e DestaqueDirective daqui, eles agora estão no SharedModule
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule // <<--- IMPORTE O SharedModule aqui!
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptorsFromDi())
  ],
  // Remova os exports de MaiusculaPipe e DestaqueDirective daqui
  bootstrap: [AppComponent],
})
export class AppModule {}