import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";

export class CardsList extends DivComponent {
    constructor(appState, state) {
        super();
        this.state = state;
        this.appState = appState;
    }

    render() {

        const cardsList = document.createElement('div');
        cardsList.classList.add('cards-list');
        for (let card of this.state.list) {
            cardsList.append(new Card(card, this.appState).render());
            this.el.append(cardsList);
        }
        return this.el;
        
    }
}

