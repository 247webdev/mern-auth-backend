const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests Users Route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users Endpoint Ok'}));

// @route   GET api/users/register
// @desc    Register New User
// @access  Public
router.post('/register', (req, res) => {
  // Find User By Email
  User.findOne({ email: req.body.email })
    .then(user => {
      // If email already exists, send 400 response
      if(user) {
        return res.status(400).json({email: 'Email already exists'});
        // If email does not already exist, create new user
      } else {
        // Get avatar from Gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200', // avatar size option
          r: 'pg', // avatar rating option
          d: 'mm', // default avatar option
        });

        // Create new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });

        // Salt and Hash password with bcryptjs, then save new user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })

      }
    })
});

module.exports = router;
