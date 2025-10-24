import { OrderStatus } from 'domain/enums/orderStatus.enum';
import { Money } from '../value-objects/money.value';
import { OrderItem } from './order-item.entity';
import { v4 as uuid } from 'uuid';

export class Order {
  private total: number = 0;
  private status: OrderStatus = OrderStatus.CREATED;

  constructor(
    private readonly id: string = uuid(),
    private customerId: string,
    private items: OrderItem[] = [],
  ) {
    this.calculateTotal();
  }

  getId(): string {
    return this.id;
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

  addItem(itemToAdd: OrderItem) {
    const exists = this.items.find(
      (item) => item.getProductId() === itemToAdd.getProductId(),
    );

    if (exists) {
      exists.increaseQuantity(itemToAdd.getQuantity());
    } else {
      this.items.push(itemToAdd);
    }

    this.calculateTotal();
  }

  pay() {
    if (this.status !== OrderStatus.CREATED) {
      throw new Error('Order cannot be paid in its current status.');
    }

    this.status = OrderStatus.PAID;
  }

  ship() {
    if (this.status !== 'PAID') {
      throw new Error('Only paid orders can be shipped.');
    }

    this.status = OrderStatus.SHIPPED;
  }

  cancel() {
    if (this.status === OrderStatus.SHIPPED) {
      throw new Error('Shipped orders cannot be cancelled.');
    }

    this.status = OrderStatus.CANCELLED;
  }

  private calculateTotal() {
    const totalMoney = this.items
      .map((i) => i.getSubtotal())
      .reduce((acc, val) => acc.add(val), new Money(0));

    this.total = totalMoney.getAmount();
  }
}
