import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Greeting } from './components/greeting/greeting';
import { Navbar } from './components/navbar/navbar';
import { Products } from './components/products/products';
import { Footer } from './components/footer/footer';
import { HttpClientModule } from '@angular/common/http';
import { ProductFilterPipe } from './pipes/product-filter-pipe'; 
import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./module/product/product-module').then(m => m.ProductModule)
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'cart',
    loadChildren: () =>
      import('./module/cart/cart-module').then(m => m.CartModule)
  }
];
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
    AppRoutingModule,
    HttpClientModule,
    ProductFilterPipe 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})


export class AppModule { }
