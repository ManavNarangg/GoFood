const express = require('express');
const router = express.Router();

router.get('/foodData', (req, res)=>{
    try {
        res.send([global.foodCategory, global.foodItems]);
    } catch (error) {
        console.error(error);
        res.send('Server error');
    }
});

module.exports = router;