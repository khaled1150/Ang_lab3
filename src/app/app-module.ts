import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Greeting } from './components/greeting/greeting';
import { Navbar } from './components/navbar/navbar';
import { Products } from './components/products/products';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [
    App,
    Greeting,
    Navbar,
    Products,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { 
  
}
