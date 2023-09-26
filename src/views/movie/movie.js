import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { Movie } from "../../components/movie-item/movie-item";

export class MovieView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle(this.appState.choosenMovie[0].name);
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path === 'favorites' || path === 'choosenMovie') {
            this.render();
        }
    }

    render() {
        const title = document.createElement('div');
        title.classList.add('main-title');
        title.innerHTML = 
        `
            <h1 class="main-title__text">
                ${this.appState.choosenMovie[0].name}
            </h1>
        `
        const main = document.createElement('div');
        main.classList.add('main');
        main.append(title);
        main.append(new Movie(this.appState).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }
    
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}