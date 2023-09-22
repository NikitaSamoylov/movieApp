import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";

export class MainView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск фильма');
    }

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0,
    }

    appStateHook(path) {
        console.log(path)
        if (path === 'favorites') {
            console.log(path)
        }
    }
    async stateHook(path) {
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadFilms(this.state.searchQuery);
            this.state.loading = true;
            console.log(data);
            this.state.list = data.docs;
        }
    }
    
    async loadFilms(name) {
        const res = await fetch (`https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=10&query=${name}`, {
            headers: {
              'X-API-KEY': 'K8GMKAA-47P4S4H-MWPHWW0-K7WNG37'
            }
        })
        return res.json();
    }

    render() {
        // const main = document.createElement('div');
        // main.classList.add('main');
        // main.append(new Header(this.appState, this.state).render());
        // this.app.append(main);
        this.renderHeader()
    }
    renderHeader() {
        const header = new Header(this.appState, this.state).render();
        this.app.prepend(header);
    }

}