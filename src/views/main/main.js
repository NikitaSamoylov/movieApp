import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";

export class MainView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.setTitle('Поиск фильма');
    }

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0,
    }

    render() {
        const main = document.createElement('div');
        main.classList.add('main');
        main.append(new Header(this.appState).render());
        this.app.append(main);
    }

}