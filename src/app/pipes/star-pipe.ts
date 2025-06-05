import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true
})
export class StarsPipe implements PipeTransform {
  transform(value: number): string {
    const roundedRating = Math.round(value); // Round to nearest integer
    const maxStars = 5;
    const filledStar = '★';
    const emptyStar = '☆';
    return filledStar.repeat(roundedRating) + emptyStar.repeat(maxStars - roundedRating);
  }
}