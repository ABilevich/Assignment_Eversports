# Solution

# Notes

- I worked based of the main branch, since there isn't any specification to create a feature branch
- I used node version 24.11.1 (latest LTS) for this project, as no nvm was specified
- I used Radix/Shadcn for the ui library since its suggested on the readme and the project looked interesting
- I created a base MultiSelect (Usable without necessarily needing to fetch data), and then expanded it into a QueryMultiSelect prepared to handle debounced search of graphQL data.
- Both Product and User selectors are based of the QueryMultiSelect, since they both need to query for information
- The entries in this components have a limit, this is meant to optimize the query (the downside is that clicking select all only works with the items that are actually on the list). The user has no reason to want to select all though, as it would give the same result as not using the filter (selecting nothing)
- The product list was made following the design, but a pagination component was added at the bottom.
- The page is responsive in a range, the table adjusts to be either 2 to 4 columns big
- The custom scrollbar was reused on the purchases page to insure consistency
- Some purchases had long names, this are trimmed so as to not break the grid, if we wanted we could also make them wrap into a new line or show a tooltip with the full name
- Added simple error handling for when the connection isn't possible to the server.
- Even though the purchases do come with an image, I decided to just leave a default image since the image returned was very random and sometimes non-existent. a line of code can be uncommented on the productItem to make the page show the actual product images.
