import { LightningElement, api } from 'lwc';

export default class Parent1 extends LightningElement {
    updateName() {
        this.template.querySelector('composition-child1').handleUpdateName();
    }
}
