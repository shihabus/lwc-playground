## Notes

### [Custom elements](https://developers.google.com/web/fundamentals/web-components/customelements?hl=en#properties_and_attributes)

-   new HTML native way to create reusable elements()

#### Rules of creating Custom components

-   component names must have an `-`
-   are non-self closing
-   can't register the same tag more than once

#### Custom element reactions/lifecycle hooks

-   the reaction callbacks are **synchronous**

##### constructor

-   called when an instance of the element is created or upgraded
-   used for state initialization, setting up event listeners or creating shadow dom
-   you can't access the child
-   the host can be access as `this.template`, but attributes can't be added
-   always call `super()` because it ensures proper `this` initialization
-   don’t use a `return` statement inside the constructor body, unless it is a simple early-return (return or return this).
-   don’t use the `document.write()` or `document.open()` methods.
-   don’t inspect the element's attributes and children, because they don’t exist yet.
-   don’t inspect the element’s public properties, because they’re set after the component is created.
-   parent -> child

##### connectedCallback

-   called each time the element is inserted into DOM
-   useful for running set up code like fetching resources
-   connectedCallback can be used to add attributes to the host and add eventListeners
-   you can access the child
-   to access host use `this`
-   use `this.isConnected` to see if the component is connected to the DOM or not
-   parent -> child

##### disconnectedCallback

-   when element is removed from DOM
-   place for clean ups
-   event listeners are browser garbage collected, but good if you can remove them thus we can ensure no memory leaks
-   parent -> child

##### attributeChangedCallback(attrName, oldVal, newVal)

-   called when observed attributes have been added, removed, updated or replaced
-   only attributes listed in the observedAttributes property will receive this callback

##### adoptedCallback

-   called when the custom element has been moved into a new document

```
static get observedAttributes() {
    return ['disabled', 'open'];
}
```

## [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=en#intro)

-   **Events** in Shadow DOM are _re-targeted_, that means, suppose you click a button inside a shadow DOM, the outer world can listen to the event but the `event.target` would appear as it as fired from the shadow root and not the child within it. This helps to keep the internal implementation private (encapsulation).
-   even though outside world can't reach the shadow subtree, still they are able to **style** things inside. For this, the author can leave knobs(pseudo selectors), that the consumer can access. But this doesn't mean, external styles will _leak in or out_ of the shadow boundary.

## [Lightning Web Components](https://lwc.dev/)

### CSS

-   CSS variables are inherited
-   CSS styles are scoped to the element. This is because of shadow boundaries. DOM queries and CSS selectors can't cross shadow boundaries. Thus parent styles can't leak into child.
-   CSS files should have the same name as the element

### Composition

#### Owner:

-   it is the main component that holds other components
-   it can
    -   set public properties on children
    -   can call public methods on children
    -   listen for all the child events

#### Container

-   a container component within an owner
-   it can
    -   read public properties on children
    -   can call public methods on children
    -   listen for some of the child events

#### Slots

-   slots let you pass markup to the child
-   even though slots seem to appear on child, they are actually part of the parent component
-   when we use slots, although the content appears to be rendered inside the slot element, a “pointer” to the original content gets inserted into the slot.

```
// named
<template>
    <custom-slot-wrapper2>
        <span slot="firstName">Shihab</span>
        <span slot="secondName">Shana</span>
    </custom-slot-wrapper2>
</template>

// slotWrapper.html
<template>
    <h2>Named slot wrapper</h2>
    <slot name="firstName">Default First Name</slot>
    <br />
    <slot name="secondName">Default Second Name</slot>
</template>
```

#### Events

-   To communicate up the component hierarchy, use events. To communicate down the component hierarchy, pass properties to a child via HTML attributes, or call its public methods.
-   use `this.template.addEventListener` to register events for child that are inside the shadow tree. For example direct children inside `<template>`
-   to listen to event from slots we should use `this.addEventListener` as they are not part of the shadow DOM. The listener is registered on the host.
-   listeners that are set expect on `window` are automatically removed by the framework

#### Light DOM

-   Shadow DOM makes third party integration and global styling difficult because it makes the component inaccessible to programmatic code outside it. But light DOM enables our component markup to live outside the shadow DOM.

#### Lifecycle

##### render

-   this method returns a valid HTML template
-   LWC special method
-   can be invoked before or after `connectedCallback()`
-   used for complex tasks like conditionally rendering templates

##### renderedCallback

-   LWC reuses elements when ever possible
    -   in `for:each` the `key` decides whether the elements can be re-used or not
    -   for `slot` the engine attempts to reuse but the diffing algorithm decides whether to evict them or not
-   this life cycle method may be called many times after render
-   during re-render all the expressions used in the template are re-evaluated
-   if you want to programmatically add event listeners this is the best place
-   if event listeners are of same type and config, duplicate ones will be automatically removed by the browser
-   we can use `hasRendered` flags to avoid duplicate computation when the life cycle gets re-triggered multiple times

##### errorCallback(error, stack)

-   it can only can errors inside lifecycle methods of child and not in itself
-   can be used to create error boundaries
-   `error` is JS error object and `stack` is a string
-   it is more like a try/catch or lifecycle guard for components
-   when there is an error you can use it to notify the used and render an alternate view
-   if there is an error in a component, it gets auto removed from the DOM

```
    <!-- boundary.html -->
    <template>
        <template if:true={error}>
            <error-view error={error} info={stack}></error-view>
        </template>
        <template if:false={error}>
            <healthy-view></healthy-view>
        </template>
    </template>

    // boundary.js
    import { LightningElement } from 'lwc';
    export default class Boundary extends LightningElement {
        error;
        stack;
        errorCallback(error, stack) {
            this.error = error;
        }
    }
```

#### Share Code

#### Wire Adapters

- `@wire` is used to provide a stream of data to a compomnent



## Glossary

-   Shadow Tree
-   [Shadow DOM](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/): helps to create self contained elements with limited scope of styles, using Vanilla JS. Advantages (in conjunction with Web Components):
    -   Isolated DOM
    -   Scoped CSS
    -   Composition
    -   Simplified CSS
    -   Let us think in terms of components, rather than pages
-   [`<template/>`](https://www.html5rocks.com/en/tutorials/webcomponents/template/):The `<template>` HTML element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript. Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the `<template>` element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however.
