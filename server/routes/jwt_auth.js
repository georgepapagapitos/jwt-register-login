const router = require('express').Router();
const pool = require('../db');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {

    // Destrucutre req.body (name, email, password)

    const { username, email, password } = req.body;

    // Check if user exists ( if user exists -> throw error)

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send('User with that email already exists.');
    }

    // Bcrypt the user password

    const saltRounds = 10;
    const salt = await brcypt.genSalt(saltRounds);

    const bcryptPassword = await brcypt.hash(password, salt);

    // Enter the new user inside of our db

    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, bcryptPassword]);
    res.json(newUser.rows[0]);

    // Generate JWT token

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;