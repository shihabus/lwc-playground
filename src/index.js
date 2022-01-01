import { createElement } from 'lwc';
// import Composition from 'my/app';
// import App2 from 'custom/app';
import TutorialOne from 'tutorialOne/appOne';

const app = createElement('tutorial-one', { is: TutorialOne });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
