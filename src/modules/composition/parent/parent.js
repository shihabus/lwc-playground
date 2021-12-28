import { LightningElement, api } from 'lwc';

export default class Parent extends LightningElement {
    name = 'Shihab';

    handleUpdateName() {
        console.log('Event in parent')
        this.name = 'Shihab Shana';
    }
}
