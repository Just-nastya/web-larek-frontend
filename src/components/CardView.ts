import { Component } from './base/component';
import { IBasketItem, IProductItem } from '../types';
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";


// Карточка в галерее
export class Card extends Component<IProductItem> {
    cardTitle: HTMLElement;
    cardPrice: HTMLElement;
    id: string;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
        this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
        
        this.container.addEventListener('click', () => {
            this.events.emit('card:preview', {id: this.id});
        });
    }

    set title(value: string) {
        this.setText(this.cardTitle, value);
    }

    get title(): string {
        return this.cardTitle.textContent || '';
    }

    set price(value: number | null) {
        if (!value) {
            this.setText(this.cardPrice, 'Бесценно');
        }
        else {
            this.setText(this.cardPrice, value + ' синапсов');
        }
    }
    
}


// Карточка в галерее
export class CardGallery extends Card {
    cardCategory: HTMLElement;
    cardImage: HTMLImageElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container) as HTMLImageElement;
        
        this.container.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('card:preview', {id: this.id});
        });
    }

    set category(value: string) {
        this.setText(this.cardCategory, value);
        if (value === 'софт-скил') {
            this.cardCategory.classList.add(`card__category_soft`);
        }
        else 
        if (value === 'хард-скил') {
            this.cardCategory.classList.add(`card__category_hard`);
        }
        else 
        if (value === 'другое') {
            this.cardCategory.classList.add(`card__category_other`);
        }
        else 
        if (value === 'дополнительное') {
            this.cardCategory.classList.add(`card__category_additional`);
        }
        else 
        if (value === 'кнопка') {
            this.cardCategory.classList.add(`card__category_button`);
        }
    }

    get category(): string {
        return this.cardCategory.textContent;
    }

    set image(value: string) {
        this.setImage(this.cardImage, value, this.title);
    }
    
}



// Карточка превью
export class CardPreview extends CardGallery {
    cardDescription: HTMLElement;
    cardButtonBuy: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        
        this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButtonBuy = ensureElement<HTMLButtonElement>('.card__button', this.container) as HTMLButtonElement;

        this.cardButtonBuy.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('card:buy', {id: this.id});
        });
    }

    set description(value: string) {
        this.setText(this.cardDescription, value);
    }

    set price(value: number | null) {
        if (!value) {
            this.setDisabled(this.cardButtonBuy, true);
            this.setText(this.cardButtonBuy, 'Недоступно');
            this.setText(this.cardPrice, 'Бесценно');
        }
        else {
            this.setDisabled(this.cardButtonBuy, false);
            this.setText(this.cardButtonBuy, 'Купить');
            this.setText(this.cardPrice, value + ' синапсов');
        }
    }

    set inBasket(value: boolean) {
        if (value == true) {
            this.setText(this.cardButtonBuy, 'Удалить из корзины');
        } else {
            this.setText(this.cardButtonBuy, 'Купить');
        }
    }

}



// Карточка в корзине
export class CardBasket extends Card implements IBasketItem {
    cardIndex: HTMLElement;
    cardButtonDelete: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        
        this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.cardButtonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container) as HTMLButtonElement;

        this.cardButtonDelete.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('basket:delete-item', {id: this.id});
        });
    }

    set index(value: number) {
        this.setText(this.cardIndex, String(value));
    }

}