import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {
  IBasket,
  IBasketItem,
  Basket,
  IBasketTotal,
} from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketSource = new BehaviorSubject<IBasket>(null);
  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);

  basket$ = this.basketSource.asObservable();
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get('/api/basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post('/api/basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === item.id);
    basket.items[foundItemIndex].quantity += 1;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity -= 1;
    } else {
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((i) => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete('/api/basket?id=' + basket.id).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basketId');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    let basket = this.getCurrentBasketValue();
    if (basket === null) {
      basket = this.createBasket();
    }
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = shipping + subTotal;
    this.basketTotalSource.next({
      shipping,
      total,
      subTotal,
    });
  }
}
