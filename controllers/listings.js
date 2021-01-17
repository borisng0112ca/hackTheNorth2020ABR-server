const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/config.env') });
const NodeGeocoder = require('node-geocoder');

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

  const {userId} = req.params;

  try{
    const listings = await ListingModel.find({listingUserId: userId});
    res.status(200).json(listings);
  }
  catch(err){
    res.status(404).json({message: err.message});
  }
}

async function createListing (req, res){

  const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_API,
    formatter: null, 
  });
  
  const listing = req.body;
  const mapData = await geocoder.geocode(req.body.address);
 
  const newListing = new ListingModel({...listing, coordinates:[mapData[0]['latitude'],mapData[0]['longitude']], listingId: _id, listingUserId: req.userId, date: new Date().toISOString()});

  try{
    await newListing.save();
    res.status(201).json(newListing);
  }
  catch(err){
    res.status(409).json({message: err.message});
  }
}

module.exports = {getAllListings, getUserListings, createListing};