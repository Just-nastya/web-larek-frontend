import { Component } from './base/component';
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

interface IMainScreen {
    counter: number;
    content: HTMLElement[];
}


export class MainScreen extends Component<IMainScreen> {
    private galleryContainer: HTMLElement;
    private basketButton: HTMLButtonElement;
    private basketCounter: HTMLElement;
    private pageWrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.pageWrapper = ensureElement<HTMLElement>('.page__wrapper');
        this.galleryContainer = ensureElement<HTMLElement>('.gallery', this.container);
        this.basketButton =  ensureElement<HTMLButtonElement>('.header__basket', this.container) as HTMLButtonElement;
        this.basketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set content(cards: HTMLElement[]) {
        this.galleryContainer.replaceChildren(...cards);
    }

    set counter(value: number) {
        this.setText(this.basketCounter, String(value));
    }

    blockPage(): void {
        this.pageWrapper.classList.add('page__wrapper_locked');
    }

    unblockPage(): void {
        this.pageWrapper.classList.remove('page__wrapper_locked');
    }

} 