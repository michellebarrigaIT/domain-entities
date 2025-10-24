import { Money } from '../value-objects/money.value';

export class Product {
  constructor(
    private readonly productId: string,
    private price: Money,
  ) {}

  getPrice(): Money {
    return this.price;
  }
}
