import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {
    updateName() {
        this.dispatchEvent(new CustomEvent('updatename'));
    }
}
