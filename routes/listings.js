const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {getAllListings, getUserListings, createListing} = require('../controllers/listings');

router.get('/getAllListings', auth, getAllListings);
router.get('/getUserListings', auth, getUserListings);
router.get('/createListing', auth, createListing);

module.exports = router;