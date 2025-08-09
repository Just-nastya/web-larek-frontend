/** Интерфейс, который описывает элемент продукта */
export interface IProductItem {
	id: string; // уникальный идентификатор продукта
	title: string; // название продукта
	description: string; // описание продукта
	image: string; // URL-адрес изображения продукта
	category: string; // категория продукта
	price: number | null; // цена продукта, если нет цены, то товар бесценен
	inBasket: boolean; // наличие продукта в корзине
}


/** Товар в корзине (дополнительно индекс для отображения) */
export interface IBasketItem {
    index: number; // индекс продукта в корзине
}


/** Интерфейс, который описывает данные в форме заказа--надо?*/
export interface IOrderForm { 
	paymentMethod?: 'card' | 'cash'; // способ оплаты
	deliveryAddress?: string; // адрес доставки 
	contactPhone?: string; // контактный номер телефона
	contactEmail?: string; // контактный адрес электронной почты
}


/** Интерфейс, который описывает полные данные заказа для отправки по API */
export interface IOrder { 
	total: number;
    items: string[];
    email: string;
    phone: string;
    address: string;
    payment: 'card' | 'cash';
}


/** интерфейс, который описывает результат успешного заказа от API */
export interface IOrderResult { 
	id: string; // уникальный идентификатор заказа
	total: number; // общая стоимость заказа 
}


/** Ошибки формы */
export type FormValidationErrors = Partial<Record<keyof IOrder, string>>;