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

##### connectedCallback

-   called each time the element is inserted into DOM
-   useful for running set up code like fetching resources

##### disconnectedCallback

-   when element is removed from DOM
-   place for clean ups

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
-   even though outside world can't reach the shadow subtree, still they are able to __style__ things inside. For this, the author can leave knobs(pseudo selectors), that the consumer can access. But this doesn't mean, external styles will _leak in or out_ of the shadow boundary.

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

#### Light DOM

-   Shadow DOM makes third party integration and global styling difficult because it makes the component inaccessible to programmatic code outside it. But light DOM enables our component markup to live outside the shadow DOM.
-

## Glossary

-   Shadow Tree
-   [Shadow DOM](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/): helps to create self contained elements with limited scope of styles, using Vanilla JS. Advantages (in conjunction with Web Components):
    -   Isolated DOM
    -   Scoped CSS
    -   Composition
    -   Simplified CSS
    -   Let us think in terms of components, rather than pages
-   [`<template/>`](https://www.html5rocks.com/en/tutorials/webcomponents/template/):The `<template>` HTML element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript. Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the `<template>` element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however.
