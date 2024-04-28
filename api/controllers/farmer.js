const Farmer = require("../models/Farmer.js");

const createFarmer = async (req, res) => {
  try {
    const newFarmer = new Farmer(req.body);
    const savedFarmer = await newFarmer.save();
    res.status(201).json(savedFarmer);  
  } catch (err) {
    res.status(500).json(err);  
  }
}

const updateFarmerByPhoneNumber = async (req, res) => {
  try {
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { phoneNumber: req.params.phoneNumber }, 
      { $set: req.body },
      { new: true } 
    );
  
    if (updatedFarmer) {
      res.status(200).json(updatedFarmer);
    } else {
      res.status(404).json({ message: 'Farmer not found with this phone number.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  
}

const deleteFarmerByPhoneNumber = async (req, res) => {
  try {
    await Farmer.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
    res.status(200).json("Farmer has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getFarmer = async (req, res) => {
  try {
    let result;
    if (req.params.phoneNumber) {
      result = await Farmer.findOne({ phoneNumber: req.params.phoneNumber });
    } else {
      result = await Farmer.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Farmer not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
    createFarmer,
    updateFarmerByPhoneNumber,
    deleteFarmerByPhoneNumber,
    getFarmer
}
