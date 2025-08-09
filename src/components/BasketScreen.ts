import { Component } from './base/component';
import { ensureElement, createElement } from "../utils/utils";
import { IEvents } from "./base/events";

interface IBasketScreen {
    content: HTMLElement[];
    totalAmount: string;
    products: string[];
}

// Карточка в галерее
export class BasketScreen extends Component<IBasketScreen> {
    private basketListContainer: HTMLElement;
    private orderButton: HTMLButtonElement;
    private totalAmountElement: HTMLElement;
    private productsInBasket: string[];

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.basketListContainer = ensureElement<HTMLElement>('.basket__list', this.container);
        this.orderButton =  ensureElement<HTMLButtonElement>('.button', this.container) as HTMLButtonElement;
        this.totalAmountElement = ensureElement<HTMLElement>('.basket__price', this.container);
        
        this.orderButton.addEventListener('click', () => {
            this.events.emit('delivery:open', {products: this.productsInBasket});
        });
    }

    set content(cards: HTMLElement[]) {
        if (cards.length) {
            this.basketListContainer.replaceChildren(...cards);
            this.setDisabled(this.orderButton, false);
        } else {
            this.basketListContainer.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.setDisabled(this.orderButton, true);
            this.setText(this.totalAmountElement, '0 синапсов');
        }
    }

    set totalAmount(value: string) {
        this.setText(this.totalAmountElement, value);
    }

}