import { Money } from '../value-objects/money.value';

export class OrderItem {
  constructor(
    public readonly productId: string,
    private price: Money,
    private quantity: number,
  ) {}

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
