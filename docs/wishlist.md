# API Documentation

## Wishlist

### Add a Book to the Wishlist

- **Endpoint**: `POST /api/wishlist`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Add a book to the user's wishlist. If the wishlist doesn't exist, it will be created.

#### Request Body:
```json
{
  "bookId": "67955b8cf93e488a7477ecc9"
}
```

#### Response:
```json
{
  "message": "Book added to wishlist",
  "wishlist": {
    "user": "63df43f4c1234abcd56789",
    "items": [
      "67955b8cf93e488a7477ecc9"
    ]
  }
}
```

#### Errors:
- **400 Bad Request**: Validation errors or missing required fields.
- **404 Not Found**: Book not found.
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **409 Conflict**: Book is already in the wishlist.

---

### Retrieve the User's Wishlist

- **Endpoint**: `GET /api/wishlist`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Retrieve all books in the authenticated user's wishlist.

#### Response:
```json
{
  "wishlist": [
    {
      "bookId": "67955b8cf93e488a7477ecc9",
      "name": "The Great Gatsby",
      "price": 15.99,
      "image": "http://example.com/great-gatsby.jpg"
    },
    {
      "bookId": "67955b8cf93e488a7477eae5",
      "name": "1984",
      "price": 10.99,
      "image": "http://example.com/1984.jpg"
    }
  ]
}
```

#### Errors:
- **404 Not Found**: Wishlist not found for the user.
- **401 Unauthorized**: Access denied. Invalid or expired token.

---

### Remove a Book from the Wishlist

- **Endpoint**: `DELETE /api/wishlist`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Remove a specific book from the user's wishlist.

#### Request Body:
```json
{
  "bookId": "67955b8cf93e488a7477ecc9"
}
```

#### Response:
```json
{
  "message": "Book removed from wishlist",
  "wishlist": {
    "user": "63df43f4c1234abcd56789",
    "items": []
  }
}
```

#### Errors:
- **404 Not Found**: Wishlist or book not found.
- **401 Unauthorized**: Access denied. Invalid or expired token.

