# API Documentation

## Cart

### Add Item to Cart

- **Endpoint**: `POST /api/cart`
- **Authentication**: Required (Authenticated Users)
- **Description**: Adds a book to the authenticated user's cart. Creates a new cart if one does not exist.

#### Request Body:
```json
{
  "bookId": "63df43f4c1234abcd56789",
  "quantity": 2
}
```

#### Response:
- **201 Created**:
```json
{
  "message": "Item added to cart successfully"
}
```

#### Errors:
- **400 Bad Request**: Invalid request body.
- **401 Unauthorized**: User is not authenticated.
- **500 Internal Server Error**: Server error.

---

### Retrieve Cart

- **Endpoint**: `GET /api/cart`
- **Authentication**: Required (Authenticated Users)
- **Description**: Retrieves the authenticated user's cart, including populated book details.

#### Response:
- **200 OK**:
```json
{
  "cart": [
    {
      "bookId": "63df43f4c1234abcd56789",
      "name": "The Great Gatsby",
      "price": 15.99,
      "image": "http://example.com/great-gatsby.jpg",
      "quantity": 2
    },
    {
      "bookId": "63df43f4c1234abcd56790",
      "name": "Designing Data-Intensive Applications",
      "price": 39.99,
      "image": "http://example.com/ddia.jpg",
      "quantity": 1
    }
  ]
}
```

#### Errors:
- **401 Unauthorized**: User is not authenticated.
- **404 Not Found**: Cart not found for the user.
- **500 Internal Server Error**: Server error.

---

### Update Cart Item Quantity

- **Endpoint**: `PUT /api/cart`
- **Authentication**: Required (Authenticated Users)
- **Description**: Updates the quantity of a specific book in the user's cart. Removes the item if the quantity is zero or less.

#### Request Body:
```json
{
  "bookId": "63df43f4c1234abcd56789",
  "quantity": 3
}
```

#### Response:
- **200 OK**:
```json
{
  "message": "Cart updated successfully"
}
```

#### Errors:
- **400 Bad Request**: Invalid request body.
- **401 Unauthorized**: User is not authenticated.
- **404 Not Found**: Cart or item not found.
- **500 Internal Server Error**: Server error.

---

### Delete Item from Cart

- **Endpoint**: `DELETE /api/cart`
- **Authentication**: Required (Authenticated Users)
- **Description**: Removes a specific book from the user's cart.

#### Request Body:
```json
{
  "bookId": "63df43f4c1234abcd56789"
}
```

#### Response:
- **204 No Content**: No response body.

#### Errors:
- **400 Bad Request**: Invalid request body.
- **401 Unauthorized**: User is not authenticated.
- **404 Not Found**: Cart or item not found.
- **500 Internal Server Error**: Server error.

