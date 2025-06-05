import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { CartFormValue } from '../../../models/CartFormValue';

@Component({
  selector: 'app-cart-list',
  templateUrl: './list-cart.html',
  styleUrls: ['./list-cart.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ListCart implements OnInit {
  cartForm: FormGroup | null = null;
  isUpdating: boolean = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      if (cart) {
        this.cartForm = this.fb.group({
          products: this.fb.array(cart.products.map(product =>
            this.fb.group({
              id: [product.id],
              title: [product.title],
              price: [product.price],
              quantity: [product.quantity, { min: 1, max: 99 }],
              total: [product.total],
              discountPercentage: [product.discountPercentage],
              discountedTotal: [product.discountedTotal],
              thumbnail: [product.thumbnail]
            })
          )),
          total: [cart.total],
          discountedTotal: [cart.discountedTotal],
          totalProducts: [cart.totalProducts],
          totalQuantity: [cart.totalQuantity]
        });
      } else {
        this.cartForm = null;
      }
    });
    this.cartService.fetchCart();
  }

  get productsControls() {
    return (this.cartForm?.get('products') as FormArray)?.controls || [];
  }

  getProductImage(productId: number): string {
    const product = this.cartForm?.value.products.find((p: any) => p.id === productId);
    return product?.thumbnail || 'https://via.placeholder.com/80?text=Image+Not+Found';
  }

  incrementQuantity(index: number) {
    if (this.cartForm && !this.isUpdating) {
      const control = (this.cartForm.get('products') as FormArray).at(index).get('quantity');
      const currentValue = control?.value || 0;
      if (currentValue < 99) control?.setValue(currentValue + 1);
    }
  }

  decrementQuantity(index: number) {
    if (this.cartForm && !this.isUpdating) {
      const control = (this.cartForm.get('products') as FormArray).at(index).get('quantity');
      const currentValue = control?.value || 0;
      if (currentValue > 1) control?.setValue(currentValue - 1);
    }
  }

  removeItem(index: number) {
    if (this.cartForm && !this.isUpdating) {
      this.isUpdating = true;
      this.cartService.removeItem(index);
      this.isUpdating = false; // Reset since cartService updates reactively
    }
  }

  onSubmit() {
    if (this.cartForm?.valid) {
      this.isUpdating = true;
      const formValue: CartFormValue = this.cartForm.value;
      this.cartService.updateCart(formValue);
      setTimeout(() => {
        this.isUpdating = false;
      }, 500);
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartForm = null;
  }
}