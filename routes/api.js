const express = require('express');
const router = express.Router();


router.get('/patients', (req, res) => {
    res.send("Hello World!").status(200).end();
});

module.exports = router;