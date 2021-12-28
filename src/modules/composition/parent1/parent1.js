import { LightningElement, api } from 'lwc';

// trigger child method from parent
export default class Parent1 extends LightningElement {
    updateName() {
        this.template.querySelector('composition-child1').handleUpdateName('Shihab + Shana');
    }
}
