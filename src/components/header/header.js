import { DivComponent } from "../../common/div-component";
import '../../assets/img/logo.png';
import '../../assets/img/search-icon.png';
import '../../assets/img/favorites.png';

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
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
                    <input class="header-search__input" placeholder="я ищу фильм ...">
                    <button class="header-search__button">
                        <img class="header-search__img" src="/assets/search-icon.png" alt="искать">
                    </button>
                </div>
            </div>
        `;
        return this.el;
    }
}