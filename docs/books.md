# API Documentation

## Books

### Add a New Book

- **Endpoint**: `POST /api/books`
- **Authentication**: Required (Admin only)
- **Description**: Add a new book to the store's inventory.

#### Request Body:
```json
{
  "title": "The Great Gatsby",
  "authors": ["F. Scott Fitzgerald"],
  "category": "Fiction",
  "description": "A classic novel set in the Jazz Age.",
  "price": 15.99,
  "numberOfPages": 600,
  "quantity": 100,
  "image": "http://example.com/great-gatsby.jpg"
}
```

#### Response:
- **201 Created**:
```json
{
    "message": "Book added successfully",
    "book": {
        "id": "67955c24d774b4015b501ecd",
        "title": "The Great Gatsby"
    }
}
```
#### Errors:

- **400 Bad Request**: Validation errors.
- **403 Forbidden**: Access denied. You do not have permission to perform this action.
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **500 Internal Server Error**: Server error.

---

### Retrieve All Books

- **Endpoint**: `GET /api/books`
- **Authentication**: Not Required
- **Description**: Fetch all books in the inventory.

#### Response:
- **200 OK**:
```json
{
  "books": [
    {
      "id": "67955b8cf93e488a7477ecc9",
      "title": "The Great Gatsby",
      "category": "Fiction",
      "authors": ["F. Scott Fitzgerald"],
      "numberOfPages": 600,
      "description": "A classic novel set in the Jazz Age.",
      "price": 15.99,
      "quantity": 100,
      "image": "http://example.com/great-gatsby.jpg"
    },
    {
      "id": "67955b8cf93e488a7477eae5",
      "title": "Design Data-Intensive Applications",
      "category": "Science",
      "authors": ["Martin Klepmann"],
      "numberOfPages": 590,
      "description": "The big idea behind reliable, scalable, and maintainable systems.",
      "price": 29.99,
      "quantity": 50,
      "image": "http://example.com/design-apps.jpg"
    }
  ]
}
```

---

### Retrieve a Book by ID

- **Endpoint**: `GET /api/books/:bookId`
- **Authentication**: Not Required
- **Description**: Fetch details of a single book by its ID.

#### Response:
- **200 OK**:
```json
{
  "book": {
    "id": "67955b8cf93e488a7477ecc9",
    "title": "The Great Gatsby",
    "category": "Fiction",
    "authors": ["F. Scott Fitzgerald"],
    "numberOfPages": 600,
    "description": "A classic novel set in the Jazz Age.",
    "price": 15.99,
    "quantity": 100,
    "image": "http://example.com/great-gatsby.jpg"
  }
}
```
#### Errors:
- **404 Not Found**: Book not found.
- **500 Internal Server Error**: Server error.

---

### Search Books by Title

- **Endpoint**: `GET /api/books/search?title=gatsby`
- **Authentication**: Not Required
- **Description**: Search for books by title.

#### Response:
- **200 OK**:
```json
{
  "books": [
    {
      "id": "679555acc1da6e2b71241ecf",
      "title": "The Great Gatsby",
      "category": "Fiction",
      "authors": ["F. Scott Fitzgerald"],
      "numberOfPages": 600,
      "description": "A classic novel set in the Jazz Age.",
      "price": 15.99,
      "quantity": 100,
      "image": "http://example.com/great-gatsby.jpg"
    }
  ]
}
```
#### Errors:

- **400 Bad Request**: Search query must be at least 3 characters long.
- **500 Internal Server Error**: Server error.

---

### Update a Book

- **Endpoint**: `PUT /api/books/:bookId`
- **Authentication**: Required (Admin only)
- **Description**: Update details of a book.

#### Request Body:
```json
{
  "title": "The Great Gatsby (Updated Edition)",
  "price": 19.99
}
```

#### Response:
- **200 OK**:
```json
{
  "message": "Book updated successfully",
  "book": {
    "id": "67955c24d774b4015b501ecd",
    "title": "The Great Gatsby (Updated Edition)",
    "price": 19.99
  }
}
```
#### Errors:

- **404 Not Found**: Book not found.
- **400 Bad Request**: Validation errors.
- **403 Forbidden**: Access denied. You do not have permission to perform this action.
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **500 Internal Server Error**: Server error.

---

### Delete a Book

- **Endpoint**: `DELETE /api/books/:bookId`
- **Authentication**: Required (Admin only)
- **Description**: Deletes a book by its ID.

#### Response:
- **204 No Content**:
No body is returned.
#### Errors:

- **404 Not Found**: Book not found.
- **403 Forbidden**: Access denied. You do not have permission to perform this action.
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **500 Internal Server Error**: Server error.


