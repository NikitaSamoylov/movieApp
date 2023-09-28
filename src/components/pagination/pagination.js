import { DivComponent } from "../../common/div-component";
import "../../assets/img/final-icon.png";
import "../../assets/img/arrow-left.png";
import "../../assets/img/arrow-right.png";

export class Pagination extends DivComponent {
    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }

    #increasePagination() {
        this.state.offset +=1;
    }
    #decreasePagination() {
        this.state.offset -=1;
    }

    render() {
        this.el.classList.add('pagination');
        this.el.innerHTML = 
        `
            <button class="pagination__button pagination__button--left pagination-left">
                <img class="pagination-left__icon" src="/assets/arrow-left.png" alt="back">
                назад
            </button>
            <img class="pagination-center-icon" src="/assets/final-icon.png" alt="the end of page">
            <button class="pagination__button pagination__button--right pagination-right">
                дальше
                <img class="pagination-right__icon" src="/assets/arrow-right.png" alt="further">
            </button>
        `
        const btns = this.el.querySelectorAll('.pagination__button');
        const leftBtn = this.el.querySelector('.pagination-left');
        const rightBtn = this.el.querySelector('.pagination-right');
        // this.el.querySelectorAll('.pagination__button')
        btns.forEach((el) => {
            el.addEventListener('click', () => {
                el.classList.contains('pagination__button--right')
                ? this.#increasePagination()
                : this.#decreasePagination()
            });
        });

        if (this.state.offset === this.appState.pages) {
            rightBtn.remove();
        };
        if (this.state.offset === 1) {
            leftBtn.remove();
            rightBtn.style.marginLeft = 'auto';
        }
        return this.el;
    }
}