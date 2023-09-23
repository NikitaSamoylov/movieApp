import { DivComponent } from "../../common/div-component";
import '../../assets/img/logo.png';
import '../../assets/img/search-icon.png';
import '../../assets/img/favorites.png';

export class Header extends DivComponent {
    constructor(appState, state) {
        super();
        this.appState = appState;
        this.state = state;
    }

    search() {
        const value = this.el.querySelector('input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.innerHTML = '';
        this.el.classList.add('header');
        this.el.innerHTML = `
            <img class="header__logo" src="/assets/logo.png" alt="Movie">
            <div class="header__info header-info">
            <div class="header-info__favorites">
                <img class="favorites-like" src="/assets/favorites.png">
                избранное 
                  <span class="favorites-counter">${this.appState.favorites.length}
                  </span>
            </div>
            <div class="header-info__search header-search">
                <input class="header-search__input" placeholder="я ищу фильм ..." value="${this.state.searchQuery ? this.state.searchQuery : ""}">
                <button class="header-search__button">
                    <img class="header-search__img" src="/assets/search-icon.png" alt="искать">
                </button>
            </div>
        </div>
        `;
        this.el.querySelector('button').addEventListener('click', this.search.bind(this))
        return this.el;
    }
}