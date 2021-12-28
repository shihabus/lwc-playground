import { LightningElement, api } from 'lwc';

export default class Parent extends LightningElement {
    name = 'Shihab';

    handleUpdateName() {
        this.name = 'Shihab Shana';
    }
}
