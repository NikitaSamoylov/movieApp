import { DivComponent } from "../../common/div-component";
import "../../assets/img/final-icon.png";
import "../../assets/img/arrow-left.png";
import "../../assets/img/arrow-right.png";

export class Pagination extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }

    render() {
        this.el.classList.add('pagination');
        this.el.innerHTML = 
        `
            <button class="pagination__button pagination__button--left pagination-left">
                <img class="pagination-left__icon" src="/assets/arrow-left.png" alt="back">
                назад
            </button>
            <img src="/assets/final-icon.png" alt="the end of page">
            <button class="pagination__button pagination__button--right pagination-right">
                дальше
                <img class="pagination-right__icon" src="/assets/arrow-right.png" alt="further">
            </button>
        `
        this.el.querySelectorAll('.pagination__button')
            .forEach((el) => {
                el.addEventListener('click', () => {
                    el.classList.contains('pagination__button--right')
                    ? this.state.offset +=1
                    : this.state.offset -=1
                });
            });
        return this.el;
    }
}