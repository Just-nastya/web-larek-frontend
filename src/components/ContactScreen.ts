import { Component } from './base/component';
import { IEvents } from "./base/events";

interface IContactScreen {
    container: HTMLElement
    email: string;
    phone: string;
    isValid: boolean;
    errors: string[];
}

// Карточка в галерее
export class ContactScreen extends Component<IContactScreen> {
    contactForm: HTMLFormElement;
    emailInput: HTMLInputElement;
    phoneInput: HTMLInputElement;
    formErrors: HTMLElement;
    orderButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.contactForm = container.querySelector('form[name="contacts"]') as HTMLFormElement;
	    this.emailInput = container.querySelector('input[name="email"]') as HTMLInputElement; 
        this.phoneInput = container.querySelector('input[name="phone"]') as HTMLInputElement; 
        this.formErrors = container.querySelector('.form__errors');
        this.orderButton = container.querySelector('.button') as HTMLButtonElement;

        this.container.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.name === 'email') {
                const fieldName = target.name;
                const fieldValue = target.value;
                this.events.emit('contact:input-change', { fieldName, fieldValue });
            }
             if (target.name === 'phone') {
                const fieldName = target.name;
                const fieldValue = target.value;
                this.events.emit('contact:input-change', { fieldName, fieldValue });
            }
        });

        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('order:complete');
        });

    }

    set isValid(value: boolean) {
        this.setDisabled(this.orderButton, !value);
    }

    displayErrors(errors: string[]): void {
        this.setText(this.formErrors, errors.join('; '));
    }

    set email(value: string) {
       this.emailInput.value = value; 
    }

	get email(): string {
        return this.emailInput.value;
    }

    set phone(value: string) {
       this.phoneInput.value = value; 
    }

	get phone(): string {
        return this.phoneInput.value;
	}

    reset(): void {
        this.isValid = false;
        this.displayErrors([]);
        this.email = '';
        this.phone = '';
	}

	render(): HTMLElement {
		this.isValid = false;
		this.displayErrors([]);
		return this.container;
	}

}