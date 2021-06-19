const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
    return res.send(Object.values);
});

module.exports = router;