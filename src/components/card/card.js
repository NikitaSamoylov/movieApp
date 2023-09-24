import { DivComponent } from "../../common/div-component";
import '../../assets/img/favorites-button.png';
import '../../assets/img/poster.webp';
import '../../assets/img/no-poster.png';

export class Card extends DivComponent {
    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.state);
        console.log(this.state.id)
    }
    #removeFromFavorites() {
        const foundedItem = this.appState.favorites.indexOf(this.state);
        this.appState.favorites.splice(foundedItem, 1);
    }

    render() {
        const exist = this.appState.favorites.includes(this.state);
        this.el.classList.add('card');
        this.el.innerHTML = 
        `
            <img class="card__poster" src="${this.state.poster ? this.state.poster : this.defaultImg}">   

            <div class="card__buttons card-buttons">
                <button class="card-buttons__favorites card-buttons__favorites--like ${exist ? 'item-in-favorites' : ""}">
                    <img class="card-buttons__icon" src="/assets/favorites-button.png" alt="like">
                </button>
                <button class="card-buttons__favorites card-buttons__favorites--text">
                    подробнее
                </button>
            </div>
        `

        if (!exist) {
            this.el.querySelector('.card-buttons__favorites--like')
                .addEventListener('click', this.#addToFavorites.bind(this))
        } else {
            this.el.querySelector('.card-buttons__favorites--like')
                .addEventListener('click', this.#removeFromFavorites.bind(this))
        }

        return this.el;
    }
}