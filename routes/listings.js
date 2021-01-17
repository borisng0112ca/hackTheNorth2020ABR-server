const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const {getAllListings, getUserListings, createListing} = require('../controllers/listings');

router.get('/getAllListings', getAllListings);
router.get('/getUserListings', getUserListings);
router.post('/createListing', createListing);

module.exports = router;