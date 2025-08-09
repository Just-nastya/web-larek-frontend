import { Component } from './base/component';
import { IEvents } from "./base/events";

interface ISuccessScreen {
    container: HTMLElement
    closeButton: HTMLButtonElement;
    totalElement: HTMLElement;
    totalAmount: number;
}

export class SuccessScreen extends Component<ISuccessScreen> {
    closeButton: HTMLButtonElement;
    totalElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.totalElement = container.querySelector('.order-success__description');
        this.closeButton = container.querySelector('.order-success__close') as HTMLButtonElement;

        this.closeButton.addEventListener('click', () => {
            this.events.emit('order:close');
        });
    }

    set totalAmount(value: number) {
        console.log(value);
        this.setText(this.totalElement, `Списано ${value} синапсов`);  
    }

    render(): HTMLElement {
		return this.container;
	}

}