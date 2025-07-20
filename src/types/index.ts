/** Интерфейс, который описывает элемент продукта */
interface IProductItem {
	id: string; // уникальный идентификатор продукта
	title: string; // название продукта
	description: string; // описание продукта
	image: string; // URL-адрес изображения продукта
	category: string; // категория продукта
	price: number | null; // цена продукта, если нет цены, то товар бесценен
}


/** Товар в корзине (дополнительно индекс для отображения) */
export interface IBasketItem extends IProductItem {
    index: number;
}


/** интерфейс, который описывает данные в форме заказа */
export interface IOrderForm { 
	paymentMethod?: string; // способ оплаты
	deliveryAddress?: string; // адрес доставки 
	contactPhone?: string; // контактный номер телефона
	contactEmail?: string; // контактный адрес электронной почты
    totalAmount?: number; // общая стоимость заказа
}


/** интерфейс, который описывает полные данные заказа для отправки по API */
export interface IOrder { 
	paymentMethod: string; // способ оплаты
	deliveryAddress: string; // адрес доставки 
	contactPhone: string; // контактный номер телефона
	contactEmail: string; // контактный адрес электронной почты
    totalAmount: number; // общая стоимость заказа
	productItems: string[]; // массив идентификаторов продуктов, которые были выбраны пользователем
}


/** интерфейс, который описывает результат успешного заказа от API */
export interface IOrderResult { 
	orderId: string; // уникальный идентификатор заказа
	totalAmount: number; // общая стоимость заказа 
}


/** Ошибки формы */
export type FormValidationErrors = Partial<Record<keyof IOrder, string>>;

