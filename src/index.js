import "@babel/polyfill";
import './index.html';
import './index.scss';
import { MainView } from "./views/main/main";
import { FavoritesView } from "./views/favorites/favorites";
import { MovieView } from "./views/movie/movie";

class App {
    routes = [
        {path: '', view: MainView},
        {path: '#favorites', view: FavoritesView},
        {path: '#movie', view: MovieView}
    ];

    appState = {
        favorites: [],
        choosenMovie: [],
        list: [],
        total: 0
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
        console.log('доделать индикатор загрузки, клик по карточке - Подробнее. Этот текст в main - constructor')
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find(i => i.path === location.hash).view;
        this.currentView = new view(this.appState);
        this.currentView.render();
    }
}

new App();