import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing-module';
import { List } from './list/list';

import { ProductFilterPipe } from "../../pipes/product-filter-pipe";
import { StarsPipe } from "../../pipes/star-pipe";
import { Details } from './details/details';


@NgModule({
  declarations: [
    List,
    Details
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductFilterPipe,
    StarsPipe
]
  
})
export class ProductModule { }
