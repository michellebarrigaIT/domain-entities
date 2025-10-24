export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: string = 'USD',
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(other: Money): Money {
    if (this.getCurrency() !== other.getCurrency()) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.getAmount() + other.getAmount(), this.getCurrency());
  }

  multiply(quantity: number): Money {
    return new Money(this.getAmount() * quantity, this.getCurrency());
  }

  equals(other: Money): boolean {
    return (
      this.getAmount() === other.getAmount() &&
      this.getCurrency() === other.getCurrency()
    );
  }
}
