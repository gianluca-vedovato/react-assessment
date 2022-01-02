# React assessment

## Goals of the assessment

Evaluate the implementation of concepts related to component-based architectures, testing, and frontend related knowledge in general.

## Requirements

Build a React application that allows creating users with name and friends (friends are also users) with the following:

- A page that lists all users and links to a user detail page and to a "create user" page (1 in the schema)
- A page to create a new user (2 in the schema)

  - in this page, a user must insert a name
  - a friend can optionally be selected by users already existing
  - if "new friend" is clicked a new "create user" page is stacked on top of the current one while showing a slice of the previous
    NB: this can be done infinitely - when two or more creation are stacked clicking on a lower item in the stack asks the user to save or abort the current user creation

- A page that allows edit of a user (3 in the schema)

## constrains

- a user creation or user update can randomly fail.
- if creation fails, try again without the user knowing
- if creation fails two times in a row inform the user that something went wrong and show a button that allows for a retry
- cannot have two or more users with the same name
