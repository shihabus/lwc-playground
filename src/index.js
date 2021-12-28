import { createElement } from 'lwc';
// import Composition from 'my/app';
import App2 from 'custom/app';

const app = createElement('custom-app', { is: App2 });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
