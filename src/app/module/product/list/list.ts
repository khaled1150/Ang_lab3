import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product';
import { CategoryService } from '../../../services/category.service';
import { ProductDTO } from '../../../models/product.dto';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.css'
})

export class List implements OnInit{
  constructor(private productService: ProductService,private categoryService: CategoryService) {}
  ngOnInit(): void {
     this.productService.getAllProducts().subscribe(data => {
      this.products1 = data;
      this.products=this.products1;
      this.size=this.products1.length;
      
    });
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.map(a=>{return a.name});
    });
    
  }
  apply()
  {
    //alert(this.category+"  "+this.title+"   "+this.price);
      this.products = this.products1.filter(a => {
  let c = true;

  if (this.category !== "ALL") {
    c = c && (a.category.toLowerCase() === this.category.toLowerCase());
  }

  if (this.title !== "None"&&this.title !== "") {
    c = c && (a.title.toLowerCase().includes( this.title.toLowerCase()));
  }

  if (!isNaN(this.price)) {
    c = c && (a.price <= this.price);
  }

  return c;
});

  }
  reset()
  {
    
    this.price=NaN;
    this.category="ALL";
    this.title="None";
    this.products=this.products1;
          this.size=this.products1.length;

  }
  isThere():any
  {
      return this.size>0;
  }
  products: ProductDTO[] = [];
  products1: ProductDTO[] = [];
  category: string = "ALL";
  title: string = "None";
  price: number = NaN;
  pre:string="assets/image";
  post:string=".jpeg";
  categories: string[] = [];
  size:number=0;
  

}
