const mongoose = require('mongoose');

const nudgeSchema = new mongoose.Schema({
  eventTag: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  invitation: {
    type: String,
    required: true
  }
});

const Nudge = mongoose.model('Nudge', nudgeSchema);

module.exports = Nudge;