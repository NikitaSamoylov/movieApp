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

    state = {
        list: [],
        total: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0,
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
        this.app.innerHTML = '';
        const main = document.createElement('div');
        main.classList.add('main');
        main.append(new CardsList(this.appState, {list: this.appState.favorites}).render());
        this.app.append(main);
        this.renderHeader();
    }
    renderHeader() {
        const header = new Header(this.appState, this.state).render();
        this.app.prepend(header);
    }
}