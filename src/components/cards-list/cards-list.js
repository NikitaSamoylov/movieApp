import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";

export class CardsList extends DivComponent {
    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }

    render() {
        this.el.classList.add('main-title')
        if (this.state.loading) {
            this.el.innerHTML = 
            `
                <h2 class="main-title__text">загрузка ...</h1>
            `
            return this.el;
        } 
        this.el.innerHTML = 
        `
            <h2 class="main-title__text">
                Вот что нашлось: ${this.state.total > 0
                    ? this.state.total + ' шт'
                    : "пока ничего"}
            </h1>
        `
        const cardsList = document.createElement('div');
        cardsList.classList.add('cards-list');
        for (let card of this.state.list) {
            cardsList.append(new Card(card, this.appState).render());
            this.el.append(cardsList);
        }
        return this.el;
        
    }
}

