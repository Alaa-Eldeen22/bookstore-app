# API Documentation

## Reviews

### Add a Review for a Book

- **Endpoint**: `POST /api/books/:bookId/reviews`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Add a review for a specific book.

#### Request Body:
```json
{
  "rating": 5,
  "comment": "Amazing book!"
}
```

#### Response:
```json
{
  "message": "Review added successfully",
  "review": {
    "id": "63df43f4c1234abcd56789",
    "rating": 5,
    "comment": "Amazing book!",
    "user": "67890abcd",
    "book": "67955b8cf93e488a7477ecc9"
  }
}
```

#### Errors:
- **400 Bad Request**: User has already reviewed this book.
- **404 Not Found**: Book not found.
- **401 Unauthorized**: Access denied. Invalid or expired token.

---

### Retrieve All Reviews for a Book

- **Endpoint**: `GET /api/books/:bookId/reviews`
- **Authentication**: Not Required  
- **Description**: Fetch all reviews for a specific book.

#### Response:
```json
{
  "reviews": [
    {
      "id": "63df43f4c1234abcd56789",
      "rating": 5,
      "comment": "Amazing book!",
      "user": {
        "firstname": "John",
        "lastname": "Doe",
        "id": "67890abcd"
      }
    },
    {
      "id": "63df43f4c1234abcd56790",
      "rating": 4,
      "comment": "Great read!",
      "user": {
        "firstname": "Jane",
        "lastname": "Smith",
        "id": "67891efgh"
      }
    }
  ]
}
```

#### Errors:
- **404 Not Found**: Book not found.

---

### Update a Review for a Book

- **Endpoint**: `PUT /api/books/:bookId/reviews`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Update the authenticated user's review for a specific book.

#### Request Body:
```json
{
  "rating": 4,
  "comment": "Updated review comment."
}
```

#### Response:
```json
{
  "message": "Review updated successfully",
  "review": {
    "id": "63df43f4c1234abcd56789",
    "rating": 4,
    "comment": "Updated review comment."
  }
}
```

#### Errors:
- **404 Not Found**: Review not found for this book by the user.
- **401 Unauthorized**: Access denied. Invalid or expired token.

---

### Delete a Review for a Book

- **Endpoint**: `DELETE /api/books/:bookId/reviews`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Delete the authenticated user's review for a specific book.

#### Response:
```json
{
  "message": "Review deleted successfully."
}
```

#### Errors:
- **404 Not Found**: Review not found for this book by the user.
- **401 Unauthorized**: Access denied. Invalid or expired token.

