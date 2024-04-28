const SharedLand = require("../models/SharedLand.js");

const getLand = async (req, res) => {
  try {
    const number =  req?.params.number;
    console.log("number",number);
    if(number){
      const land = await SharedLand.find({numList: number}); // gets all lands which have entered phoneNumber in its numList
      console.log(land);
      if (land.length > 0) {
        res.status(200).json(land);
      } else {
        res.status(500).json({message: "No land found with the given phone number."});
      }
    }
  } catch (error) {
    console.error('Error finding land:', error);
    return null;
  }
};

const createLand = async (req, res) => {
  try {
    const newLand = new SharedLand(req.body);
    const savedLand = await newLand.save();

    res.status(201).json({
      message: 'Land created successfully!',
      data: savedLand
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating land',
      error: error.message
    });
  }
};

const deleteLand = async (req, res) => { // girilen idye göre siler
  try {
    const landId = req.params.id;
    const deletedLand = await SharedLand.findByIdAndRemove(landId);

    if (!deletedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }

    res.json({
      message: 'Land deleted successfully',
      data: deletedLand
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting land',
      error: error.message
    });
  }
};

const updateLand = async (req, res) => { // girilen idye göre günceller
  try {
    const landId = req.params.id;
    const updateData = req.body;
    const updatedLand = await SharedLand.findByIdAndUpdate(landId, updateData, { new: true });

    if (!updatedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }

    res.json({
      message: 'Land updated successfully',
      data: updatedLand
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating land',
      error: error.message
    });
  }
}


module.exports = {
    getLand,
    createLand,
    deleteLand,
    updateLand,
}
