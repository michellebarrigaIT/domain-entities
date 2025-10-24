import { Money } from '../value-objects/money.value';

export class OrderItem {
  constructor(
    private readonly productId: string,
    private price: Money,
    private quantity: number,
  ) {}

  getProductId(): string {
    return this.productId;
  }

  getQuantity(): number {
    return this.quantity;
  }

  increaseQuantity(quantityToIncrease: number) {
    this.quantity += quantityToIncrease;
  }

  getSubtotal(): Money {
    return this.price.multiply(this.quantity);
  }
}
