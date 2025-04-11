const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Sample controller functions (to be implemented)
// const { getBookings, createBooking, getBookingById, updateBooking, deleteBooking } = require('../controllers/bookingController');

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Private
router.get('/', (req, res) => {
  res.json({ msg: 'Get all bookings' });
});

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', 
  [
    check('eventType', 'Event type is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('clientName', 'Client name is required').not().isEmpty(),
    check('contactNumber', 'Valid contact number is required').not().isEmpty()
  ],
  (req, res) => {
    res.json({ msg: 'Create a booking' });
  }
);

// @route   GET api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', (req, res) => {
  res.json({ msg: `Get booking with id ${req.params.id}` });
});

// @route   PUT api/bookings/:id
// @desc    Update booking
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ msg: `Update booking with id ${req.params.id}` });
});

// @route   DELETE api/bookings/:id
// @desc    Delete booking
// @access  Private
router.delete('/:id', (req, res) => {
  res.json({ msg: `Delete booking with id ${req.params.id}` });
});

module.exports = router;