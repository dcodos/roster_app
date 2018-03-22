# MLB Interactive Roster Web App

## Technologies used
* **Bootstrap**: Bootstrap is used to create a clean look and feel for the site, while also helping to properly lay out elements.
* **jQuery**: jQuery is used to make it easier to manipulate the DOM and interact with the roster
* **Bootstrap-select**: This is a jQuery plugin that allows for more versatile dropdown menus. This is used for the filters which allow multiple items to be selected.
* **HTML5 Web Storage**: This allows notes to be stored locally within the user's browser. All notes are stored in the `localStorage` object, so they do not expire when you close your browser. Only clearing browser data or manually deleting the note will remove it.

## Running the app
The application is a standalone website that does not require any server. Simply download the files contained in the repo and open `index.html` in a web browser. The app has been tested with Chrome. **Make sure that if the repo is downloaded as a `.zip` folder, you unzip before opening the app.**

## Using the app
This application allows for simple sorting, filtering, and note-taking on players.
* **Sorting**: To sort, click on a column header. To sort in the opposite direction, click on the header again. Clicking a new column will clear the sort on the previous column.
* **Filtering**: There are three filters: *position*, *bats*, and *throws*. All of the filters allow you to select any number of options. With the *position* filter, there will be some overlap. For example, the `Outfielders` option will contain any player with a listed position of `OF`, `LF`, `CF`, `RF`, with similar functionality for infielders and pitchers.
* **Notes**: To open the notes screen for a particular player, click on his name. This will open a modal with an input for open-ended notes. If notes have previously been recorded for this player, the text area will be automatically filled. Update the note, and then select the button to save changes. Closing the modal without saving will cause the note to be lost.
