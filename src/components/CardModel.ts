import { IProductItem } from '../types';
import { IEvents } from "./base/events";

export class CardModel {
    protected items: IProductItem[] = [];

    constructor(protected events: IEvents) {}

    setItems(items: IProductItem[]) {
        this.items = items;
        this.events.emit('gallery:changed');
    }

    setItem(id:string) {
        const item = this.getItem(id);
        if (!item.inBasket) {
            item.inBasket = true;
        } else {
            item.inBasket = false;
        }
        this.items = this.items.map(function(item) {
            return item;
        });
        this.setItems(this.items);
    }


    getItems(): IProductItem[] {
        return this.items;
    }

    getItem(id:string): IProductItem {
        return this.items.find(item => item.id === id);
    }

    getItemsInBasket(): number {
        return this.items.filter(item => item.inBasket).length;
    }

    getIdItemsInBasket(): IProductItem[] {
        return this.items.filter(item => item.inBasket);
    }
 
    getTotalAmount(): number {
       const items = this.items.filter(item => item.inBasket);
       const totalAmount = items.reduce((acc, item) => acc + item.price, 0)
       return totalAmount;
    }

    clearBasket(): void {
        this.items = this.items.map(function(item) {
            item.inBasket=false;
            return item;
        });
        this.setItems(this.items);
	}
}