import { LightningElement, api } from 'lwc';

// let child trigger parent method
export default class Parent extends LightningElement {
    name = 'Shihab';

    handleUpdateName() {
        console.log('Event in parent')
        this.name = 'Shihab Shana';
    }
}
