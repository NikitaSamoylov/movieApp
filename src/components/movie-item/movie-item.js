import { DivComponent } from "../../common/div-component";
import "../../assets/img/no-backdrop.png";
import "../../assets/img/rating-icon.png";
import "../../assets/img/release-icon.png";
import "../../assets/img/duration-icon.png";

export class Movie extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    } 

    #addToFavorites() {
        this.appState.favorites.push(this.appState.choosenMovie[0]);
    }
    #removeFromFavorites() {
        const foundedItem = this.appState.favorites.indexOf(this.appState.choosenMovie[0]);
        this.appState.favorites.splice(foundedItem, 1);
    }

    render() {
        const exist = this.appState.favorites.find(el => el.id === this.appState.choosenMovie[0].id);
        const defaultImg = "/assets/no-backdrop.png";
        this.el.classList.add('movie');
        this.el.innerHTML = 
        `
            <div class="movie__container movie-container">
                <div class="movie-container__content movie-content">
                    <img class="movie-content__poster"
                    src="${this.appState.choosenMovie[0].backdrop
                        ? this.appState.choosenMovie[0].backdrop
                        : defaultImg
                    }"
                    alt="обложка фильма">
                    <ul class="movie-content__info">
                        <li class="movie-content__item movie-item">
                            <img class="movie-item__img" src="/assets/rating-icon.png" alt="рейтинг">
                            <span class="movie-item__text">${this.appState.choosenMovie[0].rating
                                ? this.appState.choosenMovie[0].rating.toFixed(1)
                                : "нет инфо"
                            }</span>
                        </li>
                        <li class="movie-content__item movie-item">
                            <img class="movie-item__img" src="/assets/release-icon.png" alt="релиз">
                            <span class="movie-item__text">${this.appState.choosenMovie[0].year
                                ? this.appState.choosenMovie[0].year + ' год'
                                : "нет инфо"
                            }</span>
                        </li>
                        <li class="movie-content__item movie-item">
                            <img class="movie-item__img" src="/assets/duration-icon.png" alt="длительность">
                            <span class="movie-item__text">${this.appState.choosenMovie[0].movieLength
                                ? this.appState.choosenMovie[0].movieLength + ' мин'
                                : "нет инфо"
                            }</span>
                        </li>
                    </ul>
                </div>
                <button class="movie-container__btn movie-btn ${exist ? 'item-in-favorites' : ""}">
                    <img class="movie-btn__img" src="/assets/favorites-button.png" alt="like">
                    ${exist ? 'в избранном' : 'в избранное' }
                </button>
                <p class="movie-container__descr">
                    ${this.appState.choosenMovie[0].description
                    ? this.appState.choosenMovie[0].description
                    : "нет описания"
                    }
                </p>
            </div>
        `
        if (!exist) {
            this.el.querySelector('.movie-btn')
                .addEventListener('click', this.#addToFavorites.bind(this))
        } else {
            this.el.querySelector('.movie-btn')
                .addEventListener('click', this.#removeFromFavorites.bind(this));
        }

        return this.el;
    }
}