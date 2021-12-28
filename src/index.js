import { createElement } from 'lwc';
import MyApp from 'my/app';
import Composition from 'composition/sendChildParentEvent';

// const app = createElement('my-app', { is: MyApp });
const app = createElement('composition-site', { is: Composition });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
