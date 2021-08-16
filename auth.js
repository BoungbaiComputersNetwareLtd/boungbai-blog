const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');

// Registering users
router.post('/', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('User already exists!')

    user = new User({
        username: req.body.username,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    res.status(200).json({ success: true, data: _.pick(user, ["_id", "username"]) });
})

module.exports = router;