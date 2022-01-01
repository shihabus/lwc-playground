import { LightningElement, track, api } from 'lwc';

export default class BindingExample extends LightningElement {
    @api state = '';

    handleInputChange(event) {
        this.state = event.target.value;
    }
}
