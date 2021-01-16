const ListingModel = require('../models/listing');

async function getAllListings (req, res){
  try{
    const allListings = await ListingModel.find();
    res.status(200).json(allListings);
  }
  catch(err){
    res.status(404).json({message: err.message});
  }
}

async function getUserListings (req, res){

  const userId = req.params;

  try{
    const listings = await ListingModel.find({listingUserId: userId});
    res.status(200).json(listings);
  }
  catch(err){
    res.status(404).json({message: err.message});
  }
}

async function createListing (req, res){
  
  const listing = req.body;

  const newListing = new ListingModel({...listing, listingUserId: req.userId, date: new Date().toISOString()});

  try{
    await newListing.save();
    res.status(201).json(newListing);
  }
  catch(err){
    res.status(409).json({message: err.message});
  }
}

module.exports = {getAllListings, getUserListings, createListing};