import onChange from "on-change";
import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import { CardsList } from "../../components/cards-list/cards-list";
import { Search } from "../../components/search/search";
import { Pagination } from "../../components/pagination/pagination";

export class MainView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск фильма');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    state = {
        list: [],
        total: 0,
        loading: false,
        searchQuery: undefined,
        offset: 1,
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render();
        }
    }
    async stateHook(path) {
        if (path === 'searchQuery' || path === 'offset') {
            this.state.loading = true;
            const data = await this.loadFilms(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            this.state.list = data.docs;
            this.state.total = data.total;

            // const cleanData = [];
            // let promise = new Promise((resolve, reject) => {
            //     data.docs.forEach(el => {
            //         if (el.poster) {
            //             resolve(cleanData.push(el))
            //         };
            //     });
            // });
            // promise.then(() => {
            //     let totalMovies = data.docs.length - cleanData.length;
            //     this.state.list = cleanData;
            //     this.state.total = data.total - totalMovies;
            // });
        };
        if (path === 'list' || path === 'loading' || path === 'total') {
            this.render();
        }
    };
    
    async loadFilms(name, offset) {
        const res = await fetch (`https://api.kinopoisk.dev/v1.2/movie/search?page=${offset}&limit=9&query=${name}`, {
            headers: {
              'X-API-KEY': 'K8GMKAA-47P4S4H-MWPHWW0-K7WNG37',
              'mode': 'no-corse'
            }
        })
        return res.json();
    }

    render() {
        const title = document.createElement('div');
        title.classList.add('main-title');
        title.innerHTML = 
        `
            <h1 class="main-title__text">
                нашлось ${this.state.total} шт
            </h1>
        `
        const main = document.createElement('div');
        main.classList.add('main');
        main.append(new Search(this.state).render());
        main.append(title);
        main.append(new CardsList(this.appState, this.state).render());
        document.querySelector('.cards-list')
        ? main.append(new Pagination(this.state).render())
        : "";
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

}