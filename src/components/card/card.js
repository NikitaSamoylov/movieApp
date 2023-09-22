import { DivComponent } from "../../common/div-component";
import '../../assets/img/favorites-button.png';
import '../../assets/img/poster.webp';
import '../../assets/img/no-poster.png';

export class Card extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        this.defaultImg = "/assets/no-poster.png";
        this.el.classList.add('card');
        this.el.innerHTML = 
        `
            <img class="card__poster" src="${this.state.poster ? this.state.poster : this.defaultImg}">   

            <div class="card__buttons card-buttons">
                <button class="card-buttons__favorites">
                    <img class="card-buttons__icon" src="/assets/favorites-button.png" alt="like">
                </button>
                <button class="card-buttons__favorites card-buttons__favorites--text">
                    подробнее
                </button>
            </div>
        `
        return this.el;
    }
}