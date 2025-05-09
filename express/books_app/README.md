## Books App
A simple web application built with Node.js, Express.js, and MongoDB that allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of books. The app uses EJS as a templating engine to render pages dynamically.

## Features

- Create, read, update, and delete books
- Create, read, update, and delete authors
- Associate each book with an author (a book cannot be created without an author)
- Upload book cover images
- Filter/search books using regular expressions
- EJS templates for dynamic server-side views
- MongoDB with Mongoose for data storage

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

```
books_app/
├── public/         # Static files (CSS, JS, images)
├── routes/         # Express routes
├── views/          # EJS templates
├── models/         # Mongoose schemas
├── app.js          # Main server file
├── package.json    # Project metadata and dependencies
```
