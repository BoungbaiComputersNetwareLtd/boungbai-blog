const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');

// Logging-in users
router.post('/', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid username or password!');

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(400).send('Invalid username or password!');

    res.status(200).json({ success: true, data: _.pick(user, ["_id", "username"]) });
});

// Getting all users
router.get('/', async (req, res) => {
    const users = await User.find();

    if (!users) return res.status(404).send('No users yet!');

    res.status(200).json({ success: true, data: users })
})

// Deleting users
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(400).send('User does not exist');

    res.status(200).json({ success: true, data: user })
})

module.exports = router;