import './scss/styles.scss';

import { LarekApi } from "./components/LarekApi";
import { CardModel } from './components/CardModel';
import { FormModel } from './components/FormModel';
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { BasketScreen } from './components/BasketScreen';
import { CardBasket, CardGallery, CardPreview } from './components/CardView';
import { MainScreen } from './components/MainScreen';
import { ModalScreen } from './components/ModalScreen';
import { DeliveryScreen } from './components/DeliveryScreen';
import { ContactScreen } from './components/ContactScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { FormValidationErrors, IOrder, IOrderResult } from './types';



// Создаем эксземпляры класса
const api = new LarekApi(CDN_URL, API_URL);
const events = new EventEmitter();
const cardModel = new CardModel(events);
const formModel = new FormModel(events);


// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})


// Главная страница
const pageWrapper = ensureElement<HTMLElement>('.page__wrapper');
const mainScreen = new MainScreen(pageWrapper, events);


//Модалка
const modalScreen = new ModalScreen(ensureElement<HTMLElement>('#modal-container'), events);


//Корзина
const basket = ensureElement<HTMLElement>('.basket');
const basketScreen = new BasketScreen(basket, events);


// Теймплейты карточек
const cardGalleryTemplate = ensureElement<HTMLTemplateElement>('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket') as HTMLTemplateElement;


// Теймплейты формы
const orderTemplate = ensureElement<HTMLTemplateElement>('#order') as HTMLTemplateElement;
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts') as HTMLTemplateElement;
const successTemplate = ensureElement<HTMLTemplateElement>('#success') as HTMLTemplateElement;


//Форма доставки и оплаты
const deliveryScreen = new DeliveryScreen(cloneTemplate(orderTemplate), events);
const contactScreen = new ContactScreen(cloneTemplate(contactsTemplate), events);
const successScreen = new SuccessScreen(cloneTemplate(successTemplate), events);
   

// Получаем продукты с сервера
api.getProducts()
    .then(results => {
        cardModel.setItems(results);
    })
    .catch(err => {
        console.error(err);
    });

// Перерисовываем главную страницу
events.on('gallery:changed', () => {
        const galleryHTMLCards = cardModel.getItems().map(card => {
            const cardGallery = new CardGallery(cloneTemplate(cardGalleryTemplate), events);
            return cardGallery.render(card);
        });
        mainScreen.render({
            content: galleryHTMLCards,
            counter: cardModel.getItemsInBasket()
        })
});

// Открываем модалку превью
events.on('card:preview', ({id}: {id: string}) => {
    const cardData = cardModel.getItem(id);
    const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
    const cardHTML = cardPreview.render(cardData);
    modalScreen.render({
            content: cardHTML,
    });
    events.emit('modal:open');
});

// Открываем модалку корзины
events.on('basket:open', () => {
    events.emit('basket:changed');
    events.emit('modal:open');
});


// Открываем модалку с вводом адресса
events.on('delivery:open', () => {
	formModel.clearErrors();
    deliveryScreen.reset();

    const deliveryHTML = deliveryScreen.render();
    modalScreen.render({
        content: deliveryHTML
    });
});

// Запись способа оплаты в модель данных
events.on('order:payment-select',(data: { payment: 'card' | 'cash' }) => {
		formModel.setPaymentMethod(data.payment);
});

// Дейсвтия при изменении способа оплаты
events.on('order:payment-change', (data: { paymentMethod: 'card' | 'cash' }) => {
	deliveryScreen.payment = data.paymentMethod;
});

// Дейсвтия при изменении адресса
events.on('order:adress-change', (data: { fieldName: string; fieldValue: string }) => {
		formModel.updateAddress(data.fieldName, data.fieldValue);
});

// Валидация адресса
events.on('delivery:validation', (errors: FormValidationErrors) => {
	deliveryScreen.displayErrors(Object.values(errors).filter(Boolean));
	const isOrderFormPartValid = !errors.address;
	deliveryScreen.isValid = isOrderFormPartValid;
});


// Открываем модалку с вводом адресса
events.on('contact:open', () => {
    formModel.clearErrors();
    contactScreen.reset();

    const contactHTML = contactScreen.render();

    modalScreen.render({
        content: contactHTML
    });
});

// Действия при изменнии формы контактов
events.on('contact:input-change',(data: { fieldName: string; fieldValue: string }) => {
		formModel.updateContactInfo(data.fieldName, data.fieldValue);
});

// Валидация формы контактов
events.on('contact:validation', (errors: FormValidationErrors) => {
	contactScreen.displayErrors(Object.values(errors).filter(Boolean));
	const isContactFormPartValid = !errors.email && !errors.phone;
	contactScreen.isValid =
		formModel.validateAddress() && isContactFormPartValid;
});

// Действия при изменени формы
events.on('form:changed', () => {
	const isOrderFormValid = formModel.validateAddress();
	const isContactFormValid = formModel.validateContactInfo();
	deliveryScreen.isValid = isOrderFormValid;
	contactScreen.isValid = isContactFormValid;
});

// Отправляем данные на сервер
events.on('order:complete', () => {
	const orderData: IOrder = {
		payment: formModel.paymentMethod,
		email: formModel.contactEmail,
		phone: formModel.contactPhone,
		address: formModel.deliveryAddress,
		total: cardModel.getTotalAmount(),
		items: cardModel.getIdItemsInBasket().map((p) => p.id),
	};

	api.orderProducts(orderData)
		.then((response: IOrderResult) => {
            successScreen.totalAmount = response.total;
            const successHTML = successScreen.render();
            modalScreen.render({
                content: successHTML
            });       
			cardModel.clearBasket();
			formModel.resetForm();
			formModel.clearErrors();
		})
		.catch((error) => {
			let errorMessage = 'Произошла ошибка при оформлении заказа.';
			if (error && typeof error.error === 'string') {
				errorMessage = error.error;
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}
			contactScreen.displayErrors([errorMessage]);
		});
});

// Закрываем окно об успехе
events.on('order:close', () => {
    modalScreen.close();
    events.emit('modal:close');
});

// Нажимаем на кнопку купить в карточке превью
events.on('card:buy', ({id}: {id: string}) => {
    cardModel.setItem(id);
    modalScreen.close();
    events.emit('modal:close');
});

// Перерисовываем корзину
events.on('basket:changed', () => {
        const basketData = cardModel.getItems().filter(card => card.inBasket); 
        const basketHTMLCards = basketData.map((card, index) => {
            const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), events);
            cardBasket.index = index+1;
            return cardBasket.render(card);
        });
        const basketHTML = basketScreen.render({
            totalAmount: cardModel.getTotalAmount() + ' синапсов',
            content: basketHTMLCards
        });
        modalScreen.render({
            content: basketHTML
        });
});

// Удаляем из корзины карточку
events.on('basket:delete-item', ({id}: {id: string}) => {
    cardModel.setItem(id); 
    events.emit('basket:changed');
});

// Блокируем прокрутку страницы
events.on('modal:open', () => {
    mainScreen.blockPage();
});

// Разблокируем прокрутку страницы
events.on('modal:close', () => {
    mainScreen.unblockPage();
});