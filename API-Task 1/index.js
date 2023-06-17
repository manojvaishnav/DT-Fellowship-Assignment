const express = require("express");
const { ObjectId } = require("mongodb");
const connectDB = require("./db");

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());
const router = express.Router();
app.use("/api/v3/app", router);

// Connect to MongoDB
connectDB()
  .then((db) => {
    // Create a new event
    router.post("/events", async (req, res) => {
      try {
        const event = req.body; // Assuming the event data is sent in the request body
        const result = await db.collection("events").insertOne(event);
        res.json({ eventId: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Get an event by its unique ID
    router.get("/events/:eventId", async (req, res) => {
      try {
        const eventId = req.params.eventId;
        const event = await db
          .collection("events")
          .findOne({ _id: new ObjectId(eventId) });

        if (!event) {
          res.status(404).json({ error: "Event not found" });
        } else {
          res.json(event);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Update an event by its unique ID
    router.put("/events/:eventId", async (req, res) => {
      try {
        const eventId = req.params.eventId;
        const updatedEvent = req.body; // Assuming the updated event data is sent in the request body

        const result = await db
          .collection("events")
          .updateOne({ _id: new ObjectId(eventId) }, { $set: updatedEvent });

        if (result.modifiedCount === 0) {
          res.status(404).json({ error: "Event not found" });
        } else {
          res.json({ message: "Event updated successfully" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Delete an event by its unique ID
    router.delete("/events/:eventId", async (req, res) => {
      try {
        const eventId = req.params.eventId;

        const result = await db
          .collection("events")
          .deleteOne({ _id: new ObjectId(eventId) });

        if (result.deletedCount === 0) {
          res.status(404).json({ error: "Event not found" });
        } else {
          res.json({ message: "Event deleted successfully" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Get events by type (latest) and paginate results
    router.get("/events", async (req, res) => {
      try {
        const { type, limit = 10, page = 1 } = req.query;

        if (type === "latest") {
          const skip = (page - 1) * limit;

          // Get the total count of events
          const totalEvents = await db.collection("events").countDocuments();

          // Get paginated latest events
          const events = await db
            .collection("events")
            .find()
            .sort({ schedule: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

          res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalEvents,
            events,
          });
        } else {
          res.status(400).json({ error: "Invalid type parameter" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to establish database connection:", error);
    process.exit(1);
  });
