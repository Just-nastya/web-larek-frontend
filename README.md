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

- `DataProduct` —  класс управляет данными о продуктах.
```
**Поля:**
- `id: string;` — уникальный идентификатор продукта.
- `title: string;` — название продукта.
- `description: string;` — описание продукта.
- `image: string;` — URL-адрес изображения продукта.
- `category: string;` — категория продукта.
- `price: number | null;` — цена продукта, если нет цены, то товар бесценен.
```

- `DataBuyer` —  класс управляет данными о покупателе.
```
**Поля:**
- `paymentMethod: 'card' | 'cash' | '';` — способ оплаты.
- `deliveryAddress: string; ` — адрес доставки.
- `contactPhone: string;` — контактный номер телефона.
- `contactEmail: string;` — контактный адрес электронной почты.
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
- `_products: IProductItem[]` — приватный массив продуктов.
- `previewProduct: IProductItem` — текущий выбранный продукт для детального просмотра.

**Методы:**
- `renderGallery(cards: HTMLElement[]): void` — отображает массив карточек товаров.
- `setBasketCount(count: number): void` — обновляет счётчик товаров.
- `setBasketClickHandler(handler: () => void): void` — устанавливает обработчик клика на корзину.
- `set products(data: IProductItem[])` — сохраняет список продуктов.
- `get products()` — возвращает список продуктов.
- `setActiveProduct(item: IProductItem)` — устанавливает активный продукт.
```

- `Card` —  универсальный класс для создания карточек товара.
```
**Конструктор:**
- `constructor(template: HTMLTemplateElement, handleClick?: (event: MouseEvent) => void)` 

**Методы:**
- `renderGallery(data: IProductItem): HTMLElement` — создаёт карточку для галереи.
- `renderPreview(data: IProductItem): HTMLElement` — создаёт карточку для предпросмотра.
- `renderBasket(item: IBasketItem): HTMLElement` — создаёт карточку для корзины.
```

- `ModalScreen` —  универсальный класс для модальных окон. Все модальные окна наследуются от него и переопределяют методы для своих нужд.
```
**Поля:**
- `container: HTMLElement` — контейнер модального окна (class="modal-content").
- `closeButton: HTMLButtonElement` — кнопка закрытия (class="modal-close").

**Методы:**
- `open(): void` — открывает модальное окно.
- `close(): void` — закрывает модальное окно, очищает контент.
- `setContent(content: HTMLElement): void` — устанавливает содержимое модального окна.
```

- `BasketScreen` — класс для просмотра содержимого корзины.
```
**Поля:**
- `container: HTMLElement` — контейнер корзины.
- `itemsContainer: HTMLElement` — контейнер для списка товаров.
- `totalAmountElement: HTMLElement` — элемент для отображения суммы.
- `orderButton: HTMLButtonElement` — кнопка оформления заказа.
- `basket: IBasketItem[]` — массив продуктов в корзине.
 
 **Методы:**
- `render(items: HTMLElement[], total: number): void` — отображает товары и сумму.
- `setOrderHandler(handler: () => void): void` — устанавливает обработчик оформления заказа.
- `getProducts(): IProductItem[]` — возвращает копию списка продуктов в корзине.
- `getTotalCount(): number` — возвращает общее количество товаров (уникальных позиций).
- `calculateTotalAmount(): number` — возвращает общую стоимость товаров.
- `addProduct(product: IProductItem): void` — добавляет продукт в корзину (если его еще нет).
- `removeProduct(product: IProductItem): void` — удаляет продукт из корзины.
- `clearCart(): void` — очищает корзину.
```

- `ContactScreen` — класс отображает форму для ввода контактных данных.
```
**Поля:**
- `form: HTMLFormElement` — элемент формы.
- `emailInput: HTMLInputElement` — поле email.
- `phoneInput: HTMLInputElement` — поле телефона.
- `submitButton: HTMLButtonElement` — кнопка отправки.

 **Методы:**
- `getData(): IOrderForm` — возвращает введенные данные.
- `setSubmitHandler(handler: () => void): void` — устанавливает обработчик отправки.
- `showErrors(errors: TFormValidationErrors): void` — отображает ошибки валидации.
- `reset(): void` — сбрасывает значения формы.
```

- `DeliveryScreen` — класс отображает форму для ввода адреса и выбора способа оплаты.
```
**Поля::**
- `form: HTMLFormElement` — элемент формы.
- `addressInput: HTMLInputElement` — поле адреса.
- `cardPaymentRadio: HTMLInputElement` — переключатель оплаты картой.
- `cashPaymentRadio: HTMLInputElement` — переключатель оплаты наличными.
- `submitButton: HTMLButtonElement` — кнопка отправки.
- `order: IOrder` — данные заказа.

**Методы:**
- `getData(): { address: string, payment: 'card' | 'cash' | '' }` — возвращает введенные данные.
- `setSubmitHandler(handler: () => void): void` — устанавливает обработчик отправки.
- `showErrors(errors: TFormErrors): void` — отображает ошибки валидации.
- `reset(): void` — сбрасывает значения формы.
- `validateOrder(): boolean` — проверяет валидность данных заказа. Возвращает true, если валидация прошла успешно, иначе false.
- `submitOrder(): Promise` — отправляет заказ на сервер.
```

- `SuccessScreen` — класс отображает сообщение об успешном оформлении заказа.
```
**Поля:**
- `container: HTMLElement` — контейнер сообщения.
- `closeButton: HTMLButtonElement` — кнопка закрытия.
- `totalElement: HTMLElement` — элемент для отображения суммы заказа.

**Методы:**
- `show(total: number): void` — отображает сообщение с суммой заказа.
- `setCloseHandler(handler: () => void): void` — устанавливает обработчик закрытия.
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
```

- `IBasketItem` — товар в корзине (дополнительно index).
```
	index: number;
```

- `IActions` — интерфейс, который описывает обработчик событий по клику мыши.
```
	handleClick?: (event: MouseEvent) => void;
```

- `IOrderForm` — интерфейс, который описывает данные в форме заказа. 
```
	paymentMethod?: 'card' | 'cash' | ''; // способ оплаты
	deliveryAddress?: string; // адрес доставки 
	contactPhone?: string; // контактный номер телефона
	contactEmail?: string; // контактный адрес электронной почты
	totalAmount?: number; // общая стоимость заказа 
```

- `IOrder` — интерфейс, который описывает полные данные заказа для отправки по API. 
```
	paymentMethod: 'card' | 'cash' | ''; // способ оплаты
	deliveryAddress: string; // адрес доставки 
	contactPhone: string; // контактный номер телефона
	contactEmail: string; // контактный адрес электронной почты
	productItems: string[]; // массив идентификаторов продуктов, которые были выбраны пользователем
	totalAmount: number; // общая стоимость заказа 
```

- `IOrderResult` — интерфейс, который описывает результат успешного заказа от API.
```
	orderId: string; // уникальный идентификатор заказа
	totalAmount: number; // общая стоимость заказа 
```

- `TFormValidationErrors` — тип ошибки валидации формы.
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
