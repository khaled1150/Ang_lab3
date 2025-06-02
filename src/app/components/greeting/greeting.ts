import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: false,
  templateUrl: './greeting.html',
  styleUrl: './greeting.css'
})
export class Greeting {
  name: string = 'Khaled';
  count: number = 0;

  incrementCount() {
    this.count++;
  }

}
