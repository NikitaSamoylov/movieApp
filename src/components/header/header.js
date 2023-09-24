import { DivComponent } from "../../common/div-component";
import '../../assets/img/logo.png';
import '../../assets/img/favorites.png';
import '../../assets/img/header-search-icon.png';

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.innerHTML = '';
        this.el.classList.add('header');
        this.el.innerHTML = `
            <a class="header__link" href="/">
                <img class="header__logo" src="/assets/logo.png" alt="Movie">
            </a>
            <div class="nav">
                <div class="nav__item nav-item">
                    <img class="nav-icon nav-icon--search" src="/assets/header-search-icon.png">
                    <a class="nav-link nav-link--search" href="#">
                        найти фильм   
                    </a>
                </div>
                <div class="nav__item nav-item">
                    <img class="nav-icon" src="/assets/favorites.png">
                    <a class="nav-link" href="#favorites">
                        избранное   
                    </a>
                    <span class="nav-counter">${this.appState.favorites.length}</span>
                </div>
            </div>
        `;
        return this.el;
    }
}