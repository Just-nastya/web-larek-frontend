import { IEvents } from './base/events';
import { FormValidationErrors } from './../types';

export interface IFormModel {
	paymentMethod: 'card' | 'cash';
	contactEmail: string;
	contactPhone: string;
	deliveryAddress: string;
}

export class FormModel implements IFormModel {
    paymentMethod: 'card' | 'cash' = 'card';
    contactEmail: string = '';
    contactPhone: string = '';
    deliveryAddress: string = '';
    validationErrors: FormValidationErrors = {};

    constructor(protected events: IEvents) {}

    clearErrors(): void {
        this.validationErrors = {};
    }

	resetForm(): void {
        this.paymentMethod = 'card';
        this.deliveryAddress = '';
        this.contactEmail = '';
        this.contactPhone = '';
        delete this.validationErrors.payment;
        delete this.validationErrors.address;
        delete this.validationErrors.email;
        delete this.validationErrors.phone;
	}

    getValidationErrors(): FormValidationErrors {
        return this.validationErrors;
	}

	setPaymentMethod(method: 'card' | 'cash') {
        this.paymentMethod = method;
        this.validateAddress();
        this.events.emit('order:payment-change', { paymentMethod: this.paymentMethod });
        this.events.emit('form:changed');
    }

    updateAddress(field: string, value: string) {
        if (field === 'address') {
            this.deliveryAddress = value;
        }
        this.validateAddress();
        this.events.emit('form:changed');
	}

    validateAddress(): boolean {
        const errors: FormValidationErrors = {};

        if (!this.deliveryAddress) {
            errors.address= 'Адрес доставки обязателен';
        }
 
        this.validationErrors = {
            ...this.validationErrors,
            address: errors.address,
        };
        if (!errors.address) delete this.validationErrors.address;

        this.events.emit('delivery:validation', errors);
        return Object.keys(errors).length === 0;
	}

    updateContactInfo(field: string, value: string) {
        if (field === 'email') {
            this.contactEmail = value;
		} else if (field === 'phone') {
            this.contactPhone = value;
		}
        this.validateContactInfo();
        this.events.emit('form:changed');
	}

    validateContactInfo(): boolean {
        const errors: FormValidationErrors = {};

        if (!this.contactEmail) {
            errors.email = 'Email обязателен';
        }

        if (!this.contactPhone) {
            errors.phone = 'Телефон обязателен';
        }

        this.validationErrors = {
            ...this.validationErrors,
            email: errors.email,
            phone: errors.phone,
        };
        if (!errors.email) delete this.validationErrors.email;
        if (!errors.phone) delete this.validationErrors.phone;

        this.events.emit('contact:validation', errors);
        return Object.keys(errors).length === 0;
    }

    validateForms(): boolean {
        const addressValid = this.validateAddress();
        const contactValid = this.validateContactInfo();
        return addressValid && contactValid;
    }
	
}