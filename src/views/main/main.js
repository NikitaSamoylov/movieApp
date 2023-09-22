import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { CardsList } from "../../components/cards-list/cards-list";

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
        total: 0,
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
        let offset = 9;
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadFilms(this.state.searchQuery, offset);
            this.state.loading = false;
            // this.state.total = data.total;
            // this.state.list = data.docs;

            const cleanData = [];
            let promise = new Promise((resolve, reject) => {
                data.docs.forEach(el => {
                    if (el.poster) {
                        resolve(cleanData.push(el))
                    };
                });
            });
            promise.then(() => {
                let totalMovies = data.docs.length - cleanData.length;
                this.state.list = cleanData;
                this.state.total = data.total - totalMovies;
            });
        };
        if (path === 'list' || path === 'loading' || path === 'total') {
            this.render();
        };
    };
    
    async loadFilms(name, offset) {
        const res = await fetch (`https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=${offset}&query=${name}`, {
            headers: {
              'X-API-KEY': 'K8GMKAA-47P4S4H-MWPHWW0-K7WNG37',
              'mode': 'no-corse'
            }
        })
        return res.json();
    }

    render() {
        this.app.innerHTML = '';
        const main = document.createElement('div');
        main.classList.add('main');
        main.append(new CardsList(this.state).render())
        this.app.append(main);
        this.renderHeader()
    }
    renderHeader() {
        const header = new Header(this.appState, this.state).render();
        this.app.prepend(header);
    }

}