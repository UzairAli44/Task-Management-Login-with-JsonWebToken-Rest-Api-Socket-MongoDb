const db = require('../config/db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Task Route is working');
    
});




module.exports = router;
