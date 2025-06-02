import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  category: string = "ALL";
  title: string = "None";
  price: number = NaN;
  pre:string="assets/image";
  post:string=".jpeg";
  products:{name: string ,price:number , quantity:number ,image:string}[]=
  [
        { name: 'Excalibur', price: 1200, quantity: 3, image: this.pre+2+this.post },
        { name: 'Katana', price: 800, quantity: 5, image: this.pre+3+this.post },
        { name: 'Longsword', price: 600, quantity: 10, image: this.pre+4+this.post },
        { name: 'Scimitar', price: 450, quantity: 7, image: this.pre+5+this.post },
        { name: 'Claymore', price: 950, quantity: 4, image: this.pre+6+this.post },
        { name: 'Rapier', price: 500, quantity: 8, image: this.pre+7+this.post },
        { name: 'Zweihänder', price: 1100, quantity: 2, image: this.pre+8+this.post },
        { name: 'Kilij', price: 700, quantity: 6, image: this.pre+9+this.post }
    ];

}
