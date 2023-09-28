import { DivComponent } from "../../common/div-component";
import '../../assets/img/search-icon.png';

export class Search extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    search() {
        const value = this.el.querySelector('input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.classList.add('search');
        this.el.innerHTML = 
        `
            <div class="header-search">
            <input class="header-search__input" placeholder="я ищу фильм ..." value="${this.state.searchQuery ? this.state.searchQuery : ""}">
            <button class="header-search__button">
                <img class="header-search__img" src="assets/search-icon.png" alt="искать">
            </button>
            </div>
        `
        this.el.querySelector('button').addEventListener('click', this.search.bind(this));
        document.addEventListener('keydown', (evt) => {
            if (evt.code === 'Enter') {
                this.search();
            };
        });
        return this.el;
    }
}