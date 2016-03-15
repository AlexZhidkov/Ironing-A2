import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { IPrice, Price } from './price';


export class PriceStore {
  prices: ReplaySubject<List<any>> = new ReplaySubject(1);
  private list: List<any> = List();

  constructor(ref: Firebase) {
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  private emit(): void {
    this.prices.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let price = new Price(key, snapshot.val());
      this.list = this.list.push(price);
      this.emit();
    }
  }

  private deleted(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.findIndex(snapshot.key());
    if (index !== -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  private updated(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index !== -1) {
      let price = new Price(key, snapshot.val());
      this.list = this.list.set(index, price);
      this.emit();
    }
  }

  private findIndex(name: string): number {
    return this.list.findIndex((price: IPrice) => {
      return price.name === name;
    });
  }
}
