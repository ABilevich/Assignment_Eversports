# TODO

This is just a small TODO list so I can organize the things I need to do in order to solve this assignment

## Part 1 - Implement a re-usable multi-selection component

- [x] Investigate best design system for this assignment
- [ ] Inspect the figma and plan out component design
- [ ] Implement each functionality of the new component
  - [ ] As a user I can search for specific products.
  - [ ] As a user I can see the list of queried items.
  - [ ] As a user I can select or deselect all products at once.
  - [ ] As a user I can select/deselect each product individually.
  - [ ] As a user I can cancel the selection process and revert any changes by clicking the cancel button or clicking outside of the dropdown.
  - [ ] As a user I can apply my product selection by clicking the apply button.
  - [ ] As a user I can use the filter in different types of screen sizes
- [ ] Make sure special cases are handled
  - [ ] what if there’s no items available for the search?, etc

## Part 2 - Integrate the component within a page

- [ ] Inspect the figma and plan out page design
- [ ] Build a page that shows a list of purchased products by users leveraging the component from part 1 to allow for the filtering of both products and users.
  - [ ] Build base page
  - [ ] Make base component for each product
  - [ ] Add component from part 1 to allow filter
- [ ] This list should show the purchases that are the result of applying those filters.
- [ ] In the page the user can interact with both a product and a user filter and see the filtered data when the filters are applied.
- [ ] Implement each functionality of the new page
  - [ ] As a user I can see the available products, users and purchases
  - [ ] As a user I can filter purchases by specific products.
  - [ ] As a user I can filter purchases by specific users.
  - [ ] As a user I can see the results of my selection.
  - [ ] As a user I can clear the filter selection.
  - [ ] As a user I can use the filters in different types of screen sizes.
