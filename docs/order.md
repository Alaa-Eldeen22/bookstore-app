# API Documentation

## Orders

### Place a Cash-on-Delivery Order

- **Endpoint**: `POST /api/orders/cash-on-delivery`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Place an order with cash-on-delivery as the payment method.

#### Request Body:
```json
{
  "name": "John Doe",
  "fullAddress": "123 Main St, Springfield",
  "phoneNumber": "555-1234",
  "email": "john.doe@example.com",
  "governorate": "Cairo",
  "notes": "Please deliver in the morning."
}
```

#### Response:
```json
{
  "message": "Order placed successfully"
}
```

#### Errors:
- **400 Bad Request**: Validation errors or missing required fields.
- **401 Unauthorized**: Access denied. Invalid or expired token.

---

### Place a Credit Card Order

- **Endpoint**: `POST /api/orders/credit-card`
- **Authentication**: Required (Authenticated Users Only)  
- **Description**: Place an order with credit card payment through Stripe.

#### Request Body:
```json
{
  "name": "John Doe",
  "fullAddress": "123 Main St, Springfield",
  "phoneNumber": "555-1234",
  "email": "john.doe@example.com",
  "governorate": "Cairo",
  "notes": "Please deliver in the morning."
}
```

#### Response:
```json
{
  "url": "https://checkout.stripe.com/pay/12345abcdef"
}
```

#### Errors:
- **400 Bad Request**: Validation errors or missing required fields.
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **500 Internal Server Error**: Stripe session creation failed.

---

### Confirm an Order (Webhook)

- **Endpoint**: `POST /api/orders/confirm-order`
- **Authentication**: Not Required (Webhook)  
- **Description**: Confirm payment for an order (triggered by Stripe webhook).

#### Request Body:
```json
{
  "eventType": "checkout.session.completed",
  "orderId": "63df43f4c1234abcd56789"
}
```

#### Response:
```json
{
  "received": true
}
```

#### Errors:
- **400 Bad Request**: Unsupported event type or missing fields.
- **500 Internal Server Error**: Unable to update the order.

---

### Retrieve All Orders (Admin Only)

- **Endpoint**: `GET /api/orders`
- **Authentication**: Required (Admin Only)  
- **Description**: Retrieve a paginated list of all orders.

#### Query Parameters:
- `page` (optional, default: `1`): The page number for pagination.

#### Response:
```json
{
  "orders": [
    {
      "id": "63df43f4c1234abcd56789",
      "user": "12345abcd",
      "items": [
        { "bookId": "67890abcd", "quantity": 2 }
      ],
      "totalAmount": 100.0,
      "paymentMethod": "Cash On Delivery",
      "orderDate": "2025-01-01T00:00:00Z",
      "paymentStatus": "pending"
    }
  ],
  "pagination": {
    "totalPages": 10,
    "totalOrders": 100
  }
}
```

#### Errors:
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **403 Forbidden**: Access denied. Admin role required.

---

### Update an Order's Status (Admin Only)

- **Endpoint**: `PUT /api/orders/:orderId`
- **Authentication**: Required (Admin Only)  
- **Description**: Update the status of an existing order.

#### Request Body:
```json
{
  "paymentStatus": "paid",
  "orderStatus": "shipped"
}
```

#### Response:
```json
{
  "message": "Order updated successfully"
}
```

#### Errors:
- **400 Bad Request**: Invalid status update fields.
- **404 Not Found**: Order not found.
- **401 Unauthorized**: Access denied. Invalid or expired token.
- **403 Forbidden**: Access denied. Admin role required.

