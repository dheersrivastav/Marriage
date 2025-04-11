const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// @route   GET api/events
// @desc    Get all event types
// @access  Public
router.get('/', (req, res) => {
  // This would fetch event types from the database
  // For now, returning mock data
  const eventTypes = [
    {
      id: 1,
      name: 'Wedding',
      subTypes: ['Haldi', 'Mehndi', 'Sangeet', 'Reception'],
      description: 'Make your wedding a memorable celebration with our luxury decoration services.'
    },
    {
      id: 2,
      name: 'Birthday Party',
      subTypes: ['Kids', 'Teens', 'Adults'],
      description: 'Celebrate your special day with themed decorations that match your style.'
    },
    {
      id: 3,
      name: 'Car Decoration',
      subTypes: ['Wedding Car', 'Anniversary', 'Special Occasion'],
      description: 'Beautiful car decorations for your wedding or special occasion.'
    },
    {
      id: 4,
      name: 'Tent & Stage Setup',
      subTypes: ['Wedding Stage', 'Birthday Stage', 'Corporate Event'],
      description: 'Elegant tent and stage setups for all types of celebrations.'
    },
    {
      id: 5,
      name: 'Anniversary',
      subTypes: ['Silver Jubilee', 'Golden Jubilee', 'Diamond Jubilee'],
      description: 'Celebrate your years together with beautiful decorations.'
    },
    {
      id: 6,
      name: 'Baby Shower',
      subTypes: ['Boy Theme', 'Girl Theme', 'Neutral Theme'],
      description: 'Welcome your little one with a beautifully decorated celebration.'
    }
  ];
  
  res.json(eventTypes);
});

// @route   GET api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ msg: `Get event with id ${req.params.id}` });
});

// @route   POST api/events
// @desc    Create a new event type (admin only)
// @access  Private/Admin
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
  (req, res) => {
    res.json({ msg: 'Create a new event type' });
  }
);

module.exports = router;