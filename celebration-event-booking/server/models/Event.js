const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subTypes: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String
  },
  pricing: {
    base: {
      type: Number,
      required: true
    },
    premium: {
      type: Number
    }
  },
  features: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);