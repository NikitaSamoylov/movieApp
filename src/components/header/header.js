import { DivComponent } from "../../common/div-component";
import '../../assets/img/logo.png';
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
            <a class=""header__link href="/">
            <img class="header__logo" src="/assets/logo.png" alt="Movie">
            </a>
            <div class="header__info header-info">
                <div class="header-info__favorites">
                    <img class="favorites-like" src="/assets/favorites.png">
                    <a class="favorites-link" href="#favorites">
                        избранное   
                    </a>
                    <span class="favorites-counter">${this.appState.favorites.length}
                    </span>
                </div>
            </div>
        `;
        return this.el;
    }
}