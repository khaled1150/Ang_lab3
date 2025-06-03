import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: any[], title: string, price: number, category: string): any[] {
    if (!products) return [];

    return products.filter(a => {
  let c = true;

  if (category !== "ALL") {
    c = c && (a.category.toLowerCase() === category.toLowerCase());
  }

  if (title !== "None"&&title !== "") {
    c = c && (a.title.toLowerCase().includes( title.toLowerCase()));
  }

  if (!isNaN(price)) {
    c = c && (a.price <= price);
  }
  
  return c;
});
  }
}
