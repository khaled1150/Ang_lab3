import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCart } from './list-cart/list-cart';

const routes: Routes = [{ path: '', component: ListCart }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
