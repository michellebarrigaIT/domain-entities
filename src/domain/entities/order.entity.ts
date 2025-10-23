import { OrderItem } from './order-item.entity';
import { v4 as uuid } from 'uuid';

export class Order {
  private total: number = 0;
  private status: 'CREATED' | 'PAID' | 'SHIPPED' | 'CANCELLED' = 'CREATED';

  constructor(
    private readonly _id: string = uuid(),
    private customerId: string,
    private items: OrderItem[] = [],
  ) {
    this.calculateTotal();
  }

  getId(): string {
    return this._id;
  }

  getStatus(): string {
    return this.status;
  }

  getItems(): OrderItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.total;
  }

  addItem(item: OrderItem) {
    const exists = this.items.find((i) => i.productId === item.productId);
    if (exists) {
      exists.increaseQuantity(item.getQuantity());
    } else {
      this.items.push(item);
    }
    this.calculateTotal();
  }

  pay() {
    if (this.status !== 'CREATED') {
      throw new Error('Order cannot be paid in its current status.');
    }
    this.status = 'PAID';
  }

  ship() {
    if (this.status !== 'PAID') {
      throw new Error('Only paid orders can be shipped.');
    }
    this.status = 'SHIPPED';
  }

  cancel() {
    if (this.status === 'SHIPPED') {
      throw new Error('Shipped orders cannot be cancelled.');
    }
    this.status = 'CANCELLED';
  }

  private calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }
}
