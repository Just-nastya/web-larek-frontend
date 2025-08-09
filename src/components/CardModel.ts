import { IProductItem } from '../types';
import { IEvents } from "./base/events";

export class CardModel {
    protected items: IProductItem[] = [];

    constructor(protected events: IEvents) {}

    setItems(items: IProductItem[]) {
        this.items = items;
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
        this.events.emit('gallery:changed');
	}
}