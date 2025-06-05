import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/Cart.model';
import { CartFormValue } from '../models/CartFormValue';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();
  private apiUrl = 'https://dummyjson.com/carts/1';

  constructor(private http: HttpClient) {
    this.fetchCart();
  }

  fetchCart(): void {
    this.http.get<Cart>(this.apiUrl).subscribe({
      next: (cart) => {
        // If the API doesn't include thumbnails, you might need to fetch them separately
        const updatedCart = {
          ...cart,
          products: cart.products.map(product => ({
            ...product,
            thumbnail: product.thumbnail || `https://cdn.dummyjson.com/products/${product.id}/thumbnail` // Fallback if thumbnail is missing
          }))
        };
        this.cartSubject.next(updatedCart);
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
        this.cartSubject.next(null);
      }
    });
  }

  addToCart(quantity: number): void {
    const currentCart = this.cartSubject.value;
    if (currentCart) {
      const updatedCart = { ...currentCart, totalQuantity: currentCart.totalQuantity + quantity };
      this.cartSubject.next(updatedCart);
    }
  }

  updateCart(formValue: CartFormValue): void {
    const currentCart = this.cartSubject.value;
    if (currentCart && formValue.products) {
      const updatedProducts = currentCart.products.map((product, index) => ({
        ...product,
        quantity: formValue.products[index]?.quantity || product.quantity,
        total: (formValue.products[index]?.quantity || product.quantity) * product.price,
        discountedTotal: ((formValue.products[index]?.quantity || product.quantity) * product.price) * (1 - product.discountPercentage / 100),
        thumbnail: formValue.products[index]?.thumbnail || product.thumbnail // Preserve thumbnail
      }));
      const totalQuantity = formValue.products.reduce((sum, p) => sum + (p.quantity || 0), 0);
      const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
      const discountedTotal = updatedProducts.reduce((sum, p) => sum + p.discountedTotal, 0);
      const updatedCart = {
        ...currentCart,
        products: updatedProducts,
        totalQuantity,
        total,
        discountedTotal
      };
      this.cartSubject.next(updatedCart);
      console.log('Cart updated at 12:25 PM EEST, Thursday, June 05, 2025', updatedCart);
    }
  }

  removeItem(index: number): void {
    const currentCart = this.cartSubject.value;
    if (currentCart && index >= 0 && index < currentCart.products.length) {
      const updatedProducts = [...currentCart.products];
      updatedProducts.splice(index, 1);
      const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
      const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
      const discountedTotal = updatedProducts.reduce((sum, p) => sum + p.discountedTotal, 0);
      const updatedCart: Cart = {
        ...currentCart,
        products: updatedProducts,
        totalProducts: updatedProducts.length,
        totalQuantity,
        total,
        discountedTotal
      };
      this.cartSubject.next(updatedCart);
      console.log(`Item removed from cart at 12:25 PM EEST, Thursday, June 05, 2025`, updatedCart);
    }
  }

  clearCart(): void {
    this.cartSubject.next(null);
    console.log('Cart cleared at 12:25 PM EEST, Thursday, June 05, 2025');
  }

  getTotalQuantity(): number {
    return this.cartSubject.value?.totalQuantity || 0;
  }
}