## Notes

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

## Glossary

-   Shadow Tree
-   Shadow DOM
