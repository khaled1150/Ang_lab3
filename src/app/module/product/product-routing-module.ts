import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './list/list';
import { Details } from './details/details';

const routes: Routes = [
  { path: '', component: List },       // /products
  { path: ':id', component: Details }  // /products/:id
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { 
  constructor()
  {
    console.log("shiiiiiiiiiiiit");
  }
}
