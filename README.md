# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта.
- src/components/ — папка с JS компонентами.
- src/components/base/ — папка с базовым кодом.
- src/types/ — папка с типами TypeScript.
- src/utils/ — папка с утилитами и константами.

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы.
- src/types/index.ts — файл с типами.
- src/index.ts — точка входа приложения.
- src/scss/styles.scss — корневой файл стилей.
- src/utils/constants.ts — файл с константами.
- src/utils/utils.ts — файл с утилитами.

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды:

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


---

## Архитектура проекта
В проекте используется архитектурный паттерн `MVP (Model-View-Presenter)`. Логика приложения разделена на три основных слоя:

- `Model` — отвечает за управление данными и бизнес-логику приложения, а также взаимодействие с `API`. 

- `View` — отвечает за отображение интерфейса пользователю и обработку пользовательских данных ввода. 

- `Presenter (Посредник)` — содержит логику приложения и связывает `Model` и `View`. 


---

## Model. Модели данных
Модель получает информацию с сервера и передаёт её `View` для отображения. Каждая модель представляет собой независимый компонент, который может использовать данные и обновлять их по мере необходимости.




/*
- `CardModel` —  класс управляет данными о продуктах.
```
**Поля:**
- `items: IProductItem[]` — массив продуктов.

**Методы:**
- `setItems(items: IProductItem[])` — сохраняет список продуктов.
- `getItems()(items: IProductItem[])` — возвращает список продуктов.
- `getItem(id:string): IProductItem ` — возвращает продукт по id.
- `getItemsInBasket(): number` — возвращает кол-во продуктов в корзине.
- `getIdItemsInBasket(): IProductItem[]` — возвращает массив продуктов в корзине.
- `getTotalAmount(): number` — возвращает сумму продуктов в корзине.
- `clearBasket(): void` — убирает все продукты из корзины.
```

- `FormModel` —  класс управляет данными покупателя.
```
**Поля:**
- `paymentMethod: 'card' | 'cash'` — способ оплаты.
- `contactEmail: string;` — контактный адрес электронной почты.
- `contactPhone: string;` — контактный номер телефона
- `deliveryAddress: string;` —  адрес доставки 

**Методы:**
- `clearErrors(): void` — очищает ошибки.
- `resetForm(): void` — очищает данные модели данных форм.
- `getValidationErrors(): FormValidationErrors ` — возвращает ошибки валидации.
- `setPaymentMethod(method: 'card' | 'cash') ` — записывает способ оплаты в модель данных.
- `updateAddress(field: string, value: string)` — записывает адресс в модель данных.
- `validateAddress(): boolean` — проверяет валидность заполнения адресса.
оплаты в модель данных.
- `updateContactInfo(field: string, value: string)` — записывает контакты в модель данных.
- `validateContactInfo(): boolean` — проверяет валидность заполнения контактов.
- `validateForms(): boolean ` — проверяет валидность заполнения двух форм.
``` 

---

## View. Описание интерфейса
Представление отвечает за отображение данных и взаимодействие с пользователем. Компоненты `View` получают данные от `Model` и представляют их в пользовательском интерфейсе. Все компоненты `View` принимают HTML-шаблон и `EventEmitter` в конструкторе.

- `MainScreen` —  класс для просмотра каталога продуктов.
```
**Поля:**
- `galleryContainer: HTMLElement` — контейнер для галереи товаров.
- `basketButton: HTMLButtonElement` — кнопка корзины (class="header__basket").
- `basketCounter: HTMLElement` — счётчик товаров (class="header__basket-counter").

**Методы:**
- `set content(cards: HTMLElement[])` — обновляет массив карточек товаров в галерее.
- `set counter(value: number)` — обновляет счётчик товаров.
```

- `Card` —  универсальный класс для создания карточек товара.
```
**Поля:**
- `cardTitle: HTMLElement;` — контейнер для названия товара.
- `cardPrice: HTMLElement;` — контейнер для цены товара.
- `id: string;` — id товара.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 

**Методы:**
- `set title(value: string)` — обновляет название товара.
- `get title(): string` — возвращает название товара.
- `set price(value: number | null)` — обновляет цену товара.
```

- `CardGallery` —  класс для создания карточки товара в галерее. Наследуется от класса `Card`.
```
**Поля:**
- `cardCategory: HTMLElement;` — контейнер для категории товара.
- `cardImage: HTMLImageElement;` — контейнер для картинки товара.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 

**Методы:**
- `set category(value: string)` — обновляет категорию товара.
- `get category(): string` — возвращает категорию товара.
- `set image(value: string)` — обновляет картинку товара.
```

- `CardPreview` —  класс для создания карточки товара превью. Наследуется от класса `Card`.
```
**Поля:**
- `сardDescription: HTMLElement;` — контейнер для описания товара.
- `cardButtonBuy: HTMLButtonElement;` — кнопка покупки в карточке.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 

**Методы:**
- `set description(value: string)` — обновляет описание товара.
- `set price(value: number | null)` — обновляет цену товара.
- `set inBasket(value: boolean)` — обновляет признак наличия в корзине у товара.
```

- `CardBasket` —  класс для создания карточки товара в корзине. Наследуется от класса `Card`.
```
**Поля:**
- `cardIndex: HTMLElement;` — контейнер для индекса товара в корзине.
- `cardButtonDelete: HTMLButtonElement;` — кнопка удланеия товара из корзины.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 

**Методы:**
- `set index(value: number)` — обновляет индекс товара.
```

- `ModalScreen` —  универсальный класс для модальных окон. Все модальные окна наследуются от него и переопределяют методы для своих нужд.
```
**Поля:**
- `content: HTMLElement` — контейнер модального окна (class="modal-content").
- `closeButton: HTMLButtonElement` — кнопка закрытия (class="modal-close").

**Методы:**
- `set content(value: HTMLElement)` — устанавливает содержимое модального окна.
- `open(): void` — открывает модальное окно.
- `close(): void` — закрывает модальное окно, очищает контент.
- `render(data: IModalData): HTMLElement` — отображает модальное окно.
```

- `BasketScreen` — класс для просмотра содержимого корзины.
```
**Поля:**
- `basketListContainer: HTMLElement;` — контейнер корзины.
- `orderButton: HTMLButtonElement;` — кнопка оформления заказа.
- `totalAmountElement: HTMLElement;` — элемент для отображения суммы.
- `productsInBasket: string[];` — контейнер для списка товаров.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 
 
 **Методы:**
- `set content(cards: HTMLElement[])` — устанавливает содержимое корзины.
- `set totalAmount(value: string)` — устанавливает сумму товаров в корзине.
```

- `ContactScreen` — класс отображает форму для ввода контактных данных.
```
**Поля:**
- `contactForm: HTMLFormElement;` — элемент формы.
- `emailInput: HTMLInputElement;` — поле email.
- `phoneInput: HTMLInputElement;` — поле телефона.
- `formErrors: HTMLElement;` — поле для ошибок.
- `orderButton: HTMLButtonElement;` — кнопка отправки.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 
 
 **Методы:**
- `set isValid(value: boolean)` — обновляет корректность валидации.
- `displayErrors(errors: string[]): void` — показывет ошибки в запонении формы.
- `set email(value: string)` — обновляет email.
- `get email(): string ` — возвращает email.
- `set phone(value: string)` — обновляет телефон.
- `get phone(): string ` — возвращает телефон.
- `reset(): void` — сбрасывает значения формы.
- `render(): HTMLElement` —  отображает окно с контактами.
```

- `DeliveryScreen` — класс отображает форму для ввода адреса и выбора способа оплаты.
```
**Поля::**
- `deliveryForm: HTMLFormElement;` — элемент формы.
- `addressInput: HTMLInputElement` — поле адреса.
- `formErrors: HTMLElement` — поле для ошибок.
- `orderButton: HTMLButtonElement` — кнопка отправки.
- `paymentButtons: HTMLButtonElement[];` — кнопки для выбора способа оплаты.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 
 

 **Методы:**
- `set address(value: string)` — обновляет адресс.
- `get address(): string` — возвращает адресс.
- `set payment(value: 'card' | 'cash')` — обновляет способ оплаты.
- `set isValid(value: boolean)` — обновляет корректность валидации.
- `displayErrors(errors: string[]): void` — показывет ошибки в запонении формы.
- `reset(): void` — сбрасывает значения формы.
- `render(): HTMLElement` —  отображает окно с контактами.
```

- `SuccessScreen` — класс отображает сообщение об успешном оформлении заказа.
```
**Поля:**
- `container: HTMLElement` — контейнер сообщения.
- `closeButton: HTMLButtonElement` — кнопка закрытия.
- `totalElement: HTMLElement` — элемент для отображения суммы заказа.- `totalAmount: number;` — сумма заказа.

**Конструктор:**
- `constructor(container: HTMLElement, protected events: IEvents)` 
 
**Методы:**
- `set totalAmount(value: number)` — обновляет сумма заказа.
- `render(): HTMLElement` —  отображает окно с успехом.
```

---

## Presenter. Посредник
В проекте роль посредника выполняет основной скрипт `index.ts` и `EventEmitter`.

`EventEmitter` — класс, который обеспечивает работу событийной модели. Управляет взаимодействием при возникновении событий между `View` и `Model`. При этом компоненты не знают друг о друге напрямую. 

Методы:
- `on` — установка слушателя событий.
- `off` — снятие  слушателя событий.
- `emit` — вызов всех слушателей при возникновении события.
- `onAll` — возможность слушать все события.
- `offAll` — сбросс возможности слушать все события.
- `trigger` — создание триггера (функции), которая при вызове генерирует определенное событие.


---

## Типы данных проекта
Типы данных определены в `src/types/index.ts`:
- `IProductItem` — интерфейс, который описывает элемент продукта.
```
	id: string; // уникальный идентификатор продукта
	title: string; // название продукта
	description: string; // описание продукта
	image: string; // URL-адрес изображения продукта
	category: string; // категория продукта
	price: number | null; // цена продукта, если нет цены, то товар бесценен
    inBasket: boolean; // наличие продукта в корзине
```

- `IBasketItem` — товар в корзине (дополнительно index).
```
	index: number;
```

- `IOrderForm` — интерфейс, который описывает данные в форме заказа. 
```
	paymentMethod?: 'card' | 'cash'; // способ оплаты
	deliveryAddress?: string; // адрес доставки 
	contactPhone?: string; // контактный номер телефона
	contactEmail?: string; // контактный адрес электронной почты
```

- `IOrder` — интерфейс, который описывает полные данные заказа для отправки по API. 
```
	total: number; // общая стоимость заказа 
    items: string[]; // массив идентификаторов продуктов, которые были выбраны пользователем
    email: string; // контактный адрес электронной почты
    phone: string; // контактный номер телефона
    address: string; // адрес доставки 
    payment: 'card' | 'cash'; // способ оплаты
```

- `IOrderResult` — интерфейс, который описывает результат успешного заказа от API.
```
	orderId: string; // уникальный идентификатор заказа
	totalAmount: number; // общая стоимость заказа 
```

- `FormValidationErrors` — тип ошибки валидации формы.
```
type FormValidationErrors = Partial<Record<keyof IOrder, string>>; // отображает каждое поле формы (например, payment, address, phone, и т. д.) в строке ошибки.
```


---

## Базовые классы
- `Api` — базовый класс для работы с сервером.
```
**Поля:**
- `baseUrl` — базовый адрес сервера.
- `options` — объект с заголовками запросов.

**Методы:**
- `get(endpoint: string): Promise` — GET-запрос.
- `post(endpoint: string, data: object): Promise` — POST-запрос.
- `handleResponse(response: Response): Promise` — обработка ответа сервера.
```

- `Component<T>` — абстрактный базовый класс, предназначенным для создания компонентов пользовательского интерфейса. Класс обеспечивает инструментарий для управления DOM элементами и поведением компонента. Наследуется всеми классами представления(View).
```
**Конструктор:**
- `constructor(container: HTMLElement)` — принимает элемент контейнера, в который будет помещен компонент.

**Методы:**
- `toggleClass` — переключается класс для переданного элемента.
- `setText` — устанавливает текстовое содержимое для переданного элемента.
- `setImage` — устанавливает изображения и альтернативный текст для изоображения(опционально) для переданного элемента типа HTMLImageElement.
- `setDisabled` — изменяет статус блокировки для переданного элемента.
- `setHidden` — скрывает переданный элемент.
- `setVisible` — отображает переданный элемент.
- `render` — рендерит компонент, используя переданные данные. Метод должен быть переназначен в дочерних классах.
```


---

## Api для проекта
- `LarekApi` — класс для работы с сервера проекта.
```
**Методы:**
- `getProducts(): Promise<IProductItem[]>` — GET-запрос продуктов.
- `getProductItem(id: string): Promise<IProductItem>` — GET-запрос продукта по id.
- `orderProducts(order: IOrder): Promise<IOrderResult>` — обработка ответа сервера.
```