import { DivComponent } from "../../common/div-component";
import '../../assets/img/favorites-button.png';
import '../../assets/img/poster.webp';
import '../../assets/img/no-poster.png';

export class Card extends DivComponent {
    constructor(card, appState) {
        super();
        this.card = card;
        this.appState = appState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.card);
    }
    #removeFromFavorites() {
        const foundedItem = this.appState.favorites.indexOf(this.card);
        this.appState.favorites.splice(foundedItem, 1);
    }
    #addChoosenMovie() {
        this.appState.choosenMovie.length = 0;
        this.appState.choosenMovie.push(this.card);
        location.href='#movie';
    }

    render() {
        const defaultImg = "assets/no-poster.png";
        const exist = this.appState.favorites.find(el => el.id === this.card.id);
        this.el.classList.add('card');
        this.el.innerHTML = 
        `
            <img class="card__poster" src="${this.card.poster ? this.card.poster : defaultImg}" onclick="location.href='#movie'">   
            <h2 class="card__title">${this.card.name ? this.card.name : 'Нет инфо'}</h2>
            <div class="card__buttons card-buttons">
                <button class="card-buttons__favorites card-buttons__favorites--like ${exist ? 'item-in-favorites' : ""}">
                    <img class="card-buttons__icon" src="assets/favorites-button.png" alt="like">
                </button>
                <button class="card-buttons__favorites card-buttons__favorites--text send-button">
                    подробнее
                </button>
            </div>
        `

        if (!exist) {
            this.el.querySelector('.card-buttons__favorites--like')
            .addEventListener('click', this.#addToFavorites.bind(this))
        } else {
            this.el.querySelector('.card-buttons__favorites--like')
            .addEventListener('click', this.#removeFromFavorites.bind(this));
        }

        this.el.querySelector('.send-button')
        .addEventListener('click', this.#addChoosenMovie.bind(this));

        return this.el;
    }
}