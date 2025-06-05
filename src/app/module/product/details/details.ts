
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product-model';
import { StarsPipe } from '../../../pipes/star-pipe';
import { ProductService } from '../../../services/product';
import { App } from '../../../app';


@Component({
  selector: 'app-product-details',
  templateUrl: './details.html',
  styleUrls: ['./details.css'],
  standalone: false,
  
})
export class Details implements OnInit {
  product: Product | undefined;
  quantity: number = 1;
  isAdding: boolean = false;
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
   private appComponent: App
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    }
  }

  incrementQuantity() {
    if (this.quantity < (this.product?.stock || Infinity) && !this.isAdding) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1 && !this.isAdding) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product && this.quantity > 0 && !this.isAdding) {
     
      for (let i = 0; i < this.quantity; i++) {
        this.appComponent.addToCart(); // Update cart count in AppComponent
      }
      this.isAdding = true;
      setTimeout(() => {
        this.isAdding = false;
        this.showModal = true; // Show modal after adding
        console.log(`Added ${this.quantity} of ${this.product?.title} to cart at 12:58 AM EEST, Thursday, June 05, 2025`);
      }, 1000); // Simulate a brief delay for adding
    }
  }

  closeModal(event?: MouseEvent) {
    if (event && event.target === event.currentTarget) {
      this.showModal = false; // Close modal if clicking overlay
    } else if (!event) {
      this.showModal = false; // Close modal if clicking button
    }
  }
}