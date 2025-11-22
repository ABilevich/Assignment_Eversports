# TODO

This is just a small TODO list so I can organize the things I need to do in order to solve this assignment

## Part 1 - Implement a re-usable multi-selection component

- [x] Investigate best design system for this assignment
- [x] Inspect the figma and plan out component design
- [x] Implement each functionality of the new component
  - [x] As a user I can search for specific products.
  - [x] As a user I can see the list of queried items.
  - [x] As a user I can select or deselect all products at once.
  - [x] As a user I can select/deselect each product individually.
  - [x] As a user I can cancel the selection process and revert any changes by clicking the cancel button or clicking outside of the dropdown.
  - [x] As a user I can apply my product selection by clicking the apply button.
  - [x] As a user I can use the filter in different types of screen sizes
- [x] Make sure special cases are handled
  - [x] what if there’s no items available for the search?, etc
  - [x] handle if items fail to load

## Part 2 - Integrate the component within a page

- [x] Inspect the figma and plan out page design
- [x] Build a page that shows a list of purchased products by users leveraging the component from part 1 to allow for the filtering of both products and users.
  - [x] Build base page
  - [x] Make base component for each product
  - [x] Add component from part 1 to allow filter
- [x] This list should show the purchases that are the result of applying those filters.
- [x] In the page the user can interact with both a product and a user filter and see the filtered data when the filters are applied.
- [x] Implement each functionality of the new page
  - [x] As a user I can see the available products, users and purchases
  - [x] As a user I can filter purchases by specific products.
  - [x] As a user I can filter purchases by specific users.
  - [x] As a user I can see the results of my selection.
  - [x] As a user I can clear the filter selection.
  - [x] As a user I can use the filters in different types of screen sizes.
