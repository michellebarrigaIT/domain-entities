export class OrderItem {
  constructor(
    public readonly productId: string,
    private price: number,
    private quantity: number,
  ) {}

  getQuantity(): number {
    return this.quantity;
  }

  increaseQuantity(qty: number) {
    this.quantity += qty;
  }

  getSubtotal(): number {
    return this.price * this.quantity;
  }
}
