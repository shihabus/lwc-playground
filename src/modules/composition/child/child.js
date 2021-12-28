import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {
    updateName() {
        console.log('Event in child');
        this.dispatchEvent(new CustomEvent('updatename'));
    }
}
