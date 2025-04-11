const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventType: {
    type: String,
    required: true
  },
  subType: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    name: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    }
  },
  guestCount: {
    type: Number
  },
  requirements: {
    type: String
  },
  budget: {
    type: Number
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'cancelled', 'completed']
  },
  paymentStatus: {
    type: String,
    default: 'unpaid',
    enum: ['unpaid', 'partial', 'paid']
  },
  clientName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);