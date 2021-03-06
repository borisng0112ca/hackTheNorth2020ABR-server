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
    images: [String],
    coordinates: [Number],
    listingUserId: String,
    listingId: String,
    payRate: String,
    date: {
      type: Date,
      default: new Date(),
    },
  }
);

module.exports = mongoose.model('Listing', listingSchema);