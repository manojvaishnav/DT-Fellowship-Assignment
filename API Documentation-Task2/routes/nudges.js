const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
  }),
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extension = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extension) {
      return cb(null, true);
    }
    cb("Error: Only images (jpeg/jpg/png) are allowed.");
  },
});
const Nudge = require("../models/nudge");

// Create a nudge
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { eventTag, title, time, description, icon, invitation } = req.body;
    const image = req.file.path;

    const nudge = new Nudge({
      eventTag,
      title,
      image,
      time,
      description,
      icon,
      invitation,
    });

    await nudge.save();

    res.json(nudge);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the nudge." });
  }
});

// Retrieve a nudge
router.get("/:id", async (req, res) => {
  try {
    const nudge = await Nudge.findById(req.params.id);
    if (!nudge) {
      return res.status(404).json({ error: "Nudge not found." });
    }
    res.json(nudge);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the nudge." });
  }
});

// Update a nudge
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { eventTag, title, time, description, icon, invitation } = req.body;
    const image = req.file ? req.file.path : null;

    const nudge = await Nudge.findByIdAndUpdate(
      req.params.id,
      { eventTag, title, time, description, icon, invitation, image },
      { new: true }
    );

    if (!nudge) {
      return res.status(404).json({ error: "Nudge not found." });
    }

    res.json(nudge);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the nudge." });
  }
});

// Delete a nudge
router.delete("/:id", async (req, res) => {
  try {
    const nudge = await Nudge.findByIdAndRemove(req.params.id);
    if (!nudge) {
      return res.status(404).json({ error: "Nudge not found." });
    }
    res.json({ message: "Nudge deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the nudge." });
  }
});

module.exports = router;
