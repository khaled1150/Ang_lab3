export interface CartFormValue {
  products: { quantity: number; id: number; title: string; price: number; total: number; discountPercentage: number; discountedTotal: number; thumbnail: string }[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}