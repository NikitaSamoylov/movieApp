import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { CardsList } from "../../components/cards-list/cards-list";

export class FavoritesView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('мои фильмы');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render();
        }
    }
    
    render() {
        const title = document.createElement('div');
        title.classList.add('main-title');
        title.innerHTML = 
        `
            <h1 class="main-title__text">
                мои фильмы
            </h1>
        `
        const main = document.createElement('div');
        main.classList.add('main');
        main.append(title);
        main.append(new CardsList(this.appState, {list: this.appState.favorites}).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
        if (this.appState.favorites.length === 0) {
            document.querySelector('.nav-link--search').click();
        };
    }
    
    renderHeader() {
        const header = new Header(this.appState, this.state).render();
        this.app.prepend(header);
    }
}