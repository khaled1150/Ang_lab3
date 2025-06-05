import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
title = 'lab3';
  cartItemCount: number = 0; // Basic cart item counter

  
  

  addToCart() {
    this.cartItemCount++;
  }
}
