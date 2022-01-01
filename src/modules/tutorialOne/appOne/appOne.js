import { LightningElement } from 'lwc';

export default class TutorialOne extends LightningElement {
    page = 0;
    handleClick(e) {
        console.log({ e });
    }

    handlePrevious() {
        this.page = Math.max(this.page - 1, 0);
    }

    handleNext() {
        this.page = this.page + 1;
    }
}
