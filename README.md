# atelier-front-end
## Project Overview
An outdated client-facing retail web-portal has become significantly outdated and it has been hurting sales numbers. The task is to redesign the site and refresh its features.
## Scope
The main focus of this project will encompass the details page which will be comprimises of four different modules:

- Overview - [ByungChan Lee](https://github.com/lbc1013)
- Related Products - [Andrew Carnero](https://github.com/anerolabs)
- Questions & Answers - [Bryan Ramirez](https://github.com/brynrmrzz)
- Ratings & Reviews - [Johannes Niemelä](https://github.com/Heine574)
## Module Information

### Related Product

The related items section displays two lists of product cards. When the product cards do not fit on the screen, the list becomes a carousel that the user can scroll through to view all the images.

The first list displayed is a list of a list of products, determined internally, that are related to the product currently being viewed.

The second list displayed will contain products which the user has selected to group together as an outfit. Users can add and remove items to their outfit list and the information will persist throughout their session.

Each product information card should display information about the product using the provided back-end API and database architecture. The product cards will have an action button.

In the Related Items List, the action button opens a compare modal window to compare the current page's item to the product card that was clicked. In the Your Outfit List, the action button removes the card from the user's list.

![related preview demo gif]('./dist/images/RelatedPreview.gif)
### Questions &amp; Answers
Questions and answers will all allow asking and answering of questions for the product selected.  The functionality contained could be describe in four components.
- View questions
The view questions component will have a questions list where the questions will be visible in a collapsing accordian style. They will each have their own respective answers list. Each answer should have a answerer's name, the date answers and any attached photos. It should also have a more questions button that will display all the available questions and an add answer button that will an answer to the list. Each question should have an option to vote whether or not the question was helpful.
- Search for a question
Searching for a question should narrow the list down to any questions that include the search term only if the term is more than 3 characters. There should be no refresh involved. If there are less than 3 characters it should revert back to it's original view.
- Asking a question
To submit a question a user has to input a name, email, and a question body before submission.
- Answering a question
Answering a question should be the same as posting but with the option to upload photos as well.

## Technologies
- Built using React with Sass

## Getting Started
### - To run app on local machine:

1. Open terminal on local machine.
2. Run `git clone git@github.com:granite-devs/atelier-front-end.git`.
3. Change `src/config.ex.js` file to `src/config.js`.
4. Assign 'your_key' to your auth token.
5. Install dependencies `npm install`.
6. Start the server `npm run start`.
