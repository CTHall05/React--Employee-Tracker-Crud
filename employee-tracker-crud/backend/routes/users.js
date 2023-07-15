const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users - Retrieve all users
router.get('/', (req, res) => {
  User.getAllUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log('Error retrieving users:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// POST /users - Create a new user
router.post('/', (req, res) => {
  const { first_name, last_name, age, years_of_employment, role } = req.body;

  User.createUser({ first_name, last_name, age, years_of_employment, role })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'An error occured' });
    });
});

// Patch /users - Edit a user
router.patch('/:id', (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, age, years_of_employment, role } = req.body;

  User.updateUser(
    userId,
    { first_name, last_name, years_of_employment, role }
      .then((updateUser) => {
        res.json(updateUser);
      })
      .catch((err) => {
        console.log('Error updating user', err);
        res.status(500).json({ error: 'An error occurred' });
      })
  );
});

// DELETE /users/:id - Delete User
router.delete('/:id', (req, res) => {
  const userId = req.param.id;

  User.deleteUser(userId)
    .then(() => {
      res.json({ message: 'User deleted successfully' });
    })
    .catch((err) => {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;
