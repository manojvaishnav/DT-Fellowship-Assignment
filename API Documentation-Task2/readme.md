# Nudge Management System

The Nudge Management System is a Node.js-based backend application that allows users to create and manage nudges, which are reminders or notifications associated with events. Users can tag events, upload cover images, set reminder times, and provide descriptions for their nudges.

## Features

- Create a nudge with event tags, title, cover image, reminder time, description, icon, and invitation.
- Upload an image to be used as the cover image for the nudge.
- Retrieve a nudge by its ID.
- Update a nudge with new information.
- Delete a nudge by its ID.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   git clone https://github.com/manojvaishnav/DT-Fellowship-Assignment
   

2. Navigate to the project directory:

    cd DT-Fellowship-Assignment
    cd API Documentation-Task2

3. Install the dependencies:

    npm install

4. Start the application:

    node index.js

# API Documentation

### Base URL

    https://your-api.com


### API Endpoints

1. Create a Nudge

    Endpoint: POST /api/nudges
    Payload:{
        "eventTag": "birthday",
        "title": "Reminder: John's Birthday",
        "image": (file upload),
        "time": "2023-06-20T12:00:00",
        "description": "Don't forget to wish John a happy birthday!",
        "icon": "https://example.com/icon.png",
        "invitation": "Join the celebration"
    }

2. Retrieve a Nudge

    Endpoint: GET /api/nudges/{id}

3. Update a Nudge

    Endpoint: PUT /api/nudges/{id}
    Payload: Same as the payload for creating a nudge.

4. Delete a Nudge

    Endpoint: DELETE /api/nudges/{id}

For more details and examples, please refer to the API Documentation file(api-docs.md).