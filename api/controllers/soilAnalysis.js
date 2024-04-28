const SoilAnalysis = require("../models/SoilAnalysis.js");

const getSoilAnalysis = async (req, res) => {
  try {
    const number =  req?.params.number;
    console.log("number",number);
    if(number){
      const soilAnalysis = await SoilAnalysis.find({numList: number}); // gets all SoilAnalysiss which have entered phoneNumber in its numList
      console.log(soilAnalysis);
      if (soilAnalysis.length > 0) {
        res.status(200).json(soilAnalysis);
      } else {
        res.status(500).json({message: "No SoilAnalysis found with the given phone number."});
      }
    }
  } catch (error) {
    console.error('Error finding SoilAnalysis:', error);
    return null;
  }
};

const createSoilAnalysis = async (req, res) => {
  try {
    const newSoilAnalysis = new SoilAnalysis({ land_id: req.params.landId, ...req.body });
    const savedSoilAnalysis = await newSoilAnalysis.save();

    res.status(201).json({
      message: 'SoilAnalysis created successfully!',
      data: savedSoilAnalysis
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating SoilAnalysis',
      error: error.message
    });
  }
};

const deleteSoilAnalysis = async (req, res) => { // girilen idye göre siler
  try {
    const soilAnalysisId = req.params.id;
    const deletedSoilAnalysis = await SoilAnalysis.findByIdAndRemove(soilAnalysisId);

    if (!deletedSoilAnalysis) {
      return res.status(404).json({ message: 'SoilAnalysis not found' });
    }

    res.json({
      message: 'SoilAnalysis deleted successfully',
      data: deletedSoilAnalysis
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting SoilAnalysis',
      error: error.message
    });
  }
};

const updateSoilAnalysis = async (req, res) => { // girilen idye göre günceller
  try {
    const soilAnalysisId = req.params.id;
    const updateData = req.body;
    const updatedSoilAnalysis = await SoilAnalysis.findByIdAndUpdate(soilAnalysisId, updateData, { new: true });

    if (!updatedSoilAnalysis) {
      return res.status(404).json({ message: 'SoilAnalysis not found' });
    }

    res.json({
      message: 'SoilAnalysis updated successfully',
      data: updatedSoilAnalysis
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating SoilAnalysis',
      error: error.message
    });
  }
}


module.exports = {
    getSoilAnalysis,
    createSoilAnalysis,
    deleteSoilAnalysis,
    updateSoilAnalysis,
}
