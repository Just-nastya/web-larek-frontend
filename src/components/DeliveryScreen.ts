import { Component } from './base/component';
import { IEvents } from "./base/events";

interface IDeliveryScreen {
    container: HTMLElement
    address: string;
    payment: 'card' | 'cash';
    isValid: boolean;
    errors: string[];

}

// Карточка в галерее
export class DeliveryScreen extends Component<IDeliveryScreen> {
    deliveryForm: HTMLFormElement;
    addressInput: HTMLInputElement;
    formErrors: HTMLElement;
    orderButton: HTMLButtonElement;
    paymentButtons: HTMLButtonElement[];

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.deliveryForm = container.querySelector('form[name="order"]') as HTMLFormElement;
	    this.addressInput = container.querySelector('input[name="address"]') as HTMLInputElement; 
        this.formErrors = container.querySelector('.form__errors');
        this.orderButton = container.querySelector('.order__button');
        this.paymentButtons = Array.from(container.querySelectorAll('button[name="card"], button[name="cash"]'));

        this.paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit('order:payment-select', {payment: button.name});
            });
        });

        container.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.name === 'address') {
                const fieldName = target.name;
                const fieldValue = target.value;
                this.events.emit('order:adress-change', { fieldName, fieldValue });
            }
        });

        container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('contact:open');
        });

    }

    set address(value: string) {
       this.addressInput.value = value; 
    }

    get address(): string {
        return this.addressInput.value;
    }

    set payment(value: 'card' | 'cash') {
        if (value == 'card') {
            this.container.querySelector('button[name="card"]').classList.add('button_alt-active');
            this.container.querySelector('button[name="cash"]').classList.remove('button_alt-active');
        } else {
            this.container.querySelector('button[name="cash"]').classList.add('button_alt-active');
            this.container.querySelector('button[name="card"]').classList.remove('button_alt-active');
        }
    }

    set isValid(value: boolean) {
        this.setDisabled(this.orderButton, !value);
    }

    displayErrors(errors: string[]): void {
        this.setText(this.formErrors, errors.join('; '));
    }
    
    reset(): void {
        this.isValid = false;
        this.displayErrors([]);
        this.payment = 'card';
        this.address = '';
	}

    render(): HTMLElement {
        this.isValid = false;
        this.displayErrors([]);
        this.payment = 'card';
        this.address = '';
        return this.container;
	}

}