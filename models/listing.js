const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    address: String,
    price: Number,
    area: Number,
    numBathrooms: Number,
    numBedrooms: Number,
    coordinates: [Number],
    images: [String],
    listingUserId: String,
    date: {
      type: Date,
      default: new Date(),
    },
  }
);

module.exports = mongoose.model('Listing', listingSchema);