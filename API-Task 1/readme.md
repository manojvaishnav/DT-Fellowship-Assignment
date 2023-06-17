# Event API Documentation
  This documentation provides an overview of the Event API, which allows you to perform various operations related to events.

## Base URL
  All endpoints are prefixed with /api/v3/app. Therefore, the base URL for accessing the Event API is:
    https://yourdomain.com/api/v3/app

## Endpoints

1. Create an Event
  Create a new event.

  Endpoint: POST /events

  Request Body:
  {
    "type": "event",
    "uid": 18,
  "name": "Name of the event",
  "tagline": "A proper tag-line for the event",
  "schedule": "2023-06-20T09:00:00.000Z",
  "description": "Event description",
  "files": {
    "image": "image-file"
  },
  "moderator": "moderator-id",
  "category": "event-category",
  "sub_category": "event-sub-category",
  "rigor_rank": 5,
  "attendees": []
}

Response Body:
{
  "eventId": "12345"
}
------------------------------------------------------------------------
2. Get an Event by ID
Get the details of an event by its unique ID.

Endpoint: GET /events/:eventId

Response Body:
{
  "type": "event",
  "uid": 18,
  "name": "Name of the event",
  "tagline": "A proper tag-line for the event",
  "schedule": "2023-06-20T09:00:00.000Z",
  "description": "Event description",
  "files": {
    "image": "image-file"
  },
  "moderator": "moderator-id",
  "category": "event-category",
  "sub_category": "event-sub-category",
  "rigor_rank": 5,
  "attendees": []
}
------------------------------------------------------------------------------
3. Update an Event
Update the details of an existing event.

Endpoint: PUT /events/:eventId

Request Body:
{
  "name": "Updated name",
  "description": "Updated description"
}
Response Body:
{
  "message": "Event updated successfully"
}
----------------------------------------------------------------------------------
4. Delete an Event
Delete an event based on its unique ID.

Endpoint: DELETE /events/:eventId

Response Body:
{
  "message": "Event deleted successfully"
}
------------------------------------------------------------------------------------
5. Get Events by Recency with Pagination
Get events by their recency and paginate the results.

Endpoint: GET /events?type=latest&limit=5&page=1

Response Body:
{
  "page": 1,
  "limit": 5,
  "totalEvents": 15,
  "events": [
    {
        "type": "event",
        "uid": 18,
        "name": "Event 2",
        "tagline": "Tagline 2"
        "schedule": "2023-06-21T10:00:00.000Z",
        "description": "Event 2 description",
        "files": {
            "image": "image-file"
        },
        "moderator": "moderator-id",
        "category": "event-category",
        "sub_category": "event-sub-category",
        "rigor_rank": 4,
        "attendees": []
        },
]
}


## Error Responses

If an error occurs during the API requests, the response will include an error message in the following format:

{
  "error": "Error message"
}

Possible error messages include:

-Invalid type parameter: The provided type parameter in the request is not valid.
-Internal server error: An internal server error occurred during the processing of the request.