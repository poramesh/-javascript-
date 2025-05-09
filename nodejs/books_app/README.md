## Books App
A simple web application built with Node.js, Express.js, and MongoDB that allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of books. The app uses EJS as a templating engine to render pages dynamically.

## Features

- Add new books with title, author, and description
- View a list of all books
- Edit existing book details
- Delete books from the collection
- MongoDB for data persistence
- EJS for server-side rendering

## Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- EJS (Embedded JavaScript Templates)

## Installation
```
git clone https://github.com/poramesh/-javascript-.git
cd nodejs/books_app
npm install
http://localhost:3000/ or the port specified.
```

## Folder Structure

books_app/
├── public/         # Static files (CSS, JS, images)
├── routes/         # Express routes
├── views/          # EJS templates
├── models/         # Mongoose schemas
├── app.js          # Main server file
├── package.json    # Project metadata and dependencies
