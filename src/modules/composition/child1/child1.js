import { LightningElement, api } from 'lwc';

export default class Child1 extends LightningElement {
    @api name = 'Shihab';

    @api handleUpdateName(name) {
        console.log('Event in parent');
        this.name = name;
    }
}
