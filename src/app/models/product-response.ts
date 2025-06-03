// src/app/models/product-response.ts
import { ProductDTO } from './product.dto';

export class ProductResponse {
  products: ProductDTO[] = [];
  total = 0;
  skip = 0;
  limit = 0;
}
