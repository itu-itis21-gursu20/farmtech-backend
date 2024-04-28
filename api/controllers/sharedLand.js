const SharedLand = require("../models/SharedLand.js");

const getAllLands = async (req, res) => { // get lands by phone number
  try {
    const phoneNumber =  req?.params.phoneNumber;
    if(phoneNumber){
      const landResult = await SharedLand.find({numList: phoneNumber}); 
      if (landResult.length > 0) {
        res.status(200).json(landResult);
      } else {
        res.status(500).json({message: "No land found with the given phone number."});
      }
    } else {
      //
    }
  } catch (err) {
    res.status(500).json(err);

  }
};

const getLand = async (req, res) => {   // get land by land_id
  try {
    let result;
    const landId = req.params.landId;
    console.log(landId);
    if (landId) { // landId varsa döndürür
      result = await SharedLand.findById(landId);
    } else { // yoksa tüm landleri döndürür
      result = await SharedLand.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Land not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
};

const createLand = async (req, res) => {
  try {
    const newLand = new SharedLand(req.body);
    const savedLand = await newLand.save();

    res.status(201).json(savedLand);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteLand = async (req, res) => { // girilen idye göre siler
  try {
    const landId = req.params.id;
    const deletedLand = await SharedLand.findByIdAndRemove(landId);

    if (!deletedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }

    res.status(200).json({ message: 'Land deleted successfully' });

  } catch (error) {
    res.status(500).json(err);
  }
};

const updateLand = async (req, res) => { // girilen idye göre günceller
  try {
    const landId = req.params.id;
    const updatedData = req.body;
    const updatedLand = await SharedLand.findByIdAndUpdate(landId, updatedData, { new: true });

    if (!updatedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }

    res.json({ message: 'Land updated successfully' });
  } catch (error) {
    res.status(500).json(err);
  }
}


module.exports = {
  getAllLands,
  getLand,
  createLand,
  deleteLand,
  updateLand,
}
