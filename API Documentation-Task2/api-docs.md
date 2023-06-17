# Nudge Management System API Documentation

This document provides detailed information about the API endpoints available in the Nudge Management System.

## Base URL
    https://your-api.com

## API Endpoints

1. Create a Nudge

    Creates a new nudge with the provided information.
    Endpoint: POST /api/nudges
    Request Payload:
    {
        "eventTag": "birthday",
        "title": "Reminder: John's Birthday",
        "image": (file upload),
        "time": "2023-06-20T12:00:00",
        "description": "Don't forget to wish John a happy birthday!",
        "icon": "https://example.com/icon.png",
        "invitation": "Join the celebration"
    }

    Response:
    {
        "id": "abc123",
        "eventTag": "birthday",
        "title": "Reminder: John's Birthday",
        "image": "https://example.com/cover-image.jpg",
        "time": "2023-06-20T12:00:00",
        "description": "Don't forget to wish John a happy birthday!",
        "icon": "https://example.com/icon.png",
        "invitation": "Join the celebration"
    }

2. Retrieve a Nudge

    Retrieves the details of a specific nudge.

    Endpoint: GET /api/nudges/{id}
    Path Parameters:
        id: The unique identifier of the nudge.
    Response:
    {
        "id": "abc123",
        "eventTag": "birthday",
        "title": "Reminder: John's Birthday",
        "image": "https://example.com/cover-image.jpg",
        "time": "2023-06-20T12:00:00",
        "description": "Don't forget to wish John a happy birthday!",
        "icon": "https://example.com/icon.png",
        "invitation": "Join the celebration"
    }

3. Update a Nudge

    Updates an existing nudge with new information.

    Endpoint: PUT /api/nudges/{id}
    Path Parameters:
        id: The unique identifier of the nudge.
    Request Payload: Same as the payload for creating a nudge.
    Response:
    {
        "id": "abc123",
        "eventTag": "birthday",
        "title": "Reminder: John's Birthday",
        "image": "https://example.com/updated-cover-image.jpg",
        "time": "2023-06-20T12:00:00",
        "description": "Don't forget to wish John a happy birthday!",
        "icon": "https://example.com/icon.png",
        "invitation": "Join the celebration"
    }

4. Delete a Nudge
    
    Deletes a nudge with the specified ID.

    Endpoint: DELETE /api/nudges/{id}
    Path Parameters:
        id: The unique identifier of the nudge.
    Response:
    {
        "message": "Nudge deleted successfully."
    }

## Error Handling

If there are any errors during API requests, the server will respond with an appropriate HTTP status code and an error message in the response body. Error responses will follow the following format:

{
  "error": {
    "code": 404,
    "message": "Nudge not found."
  }
}