const SoilAnalysis = require("../models/SoilAnalysis.js");

const getAllSoilAnalyses = async (req, res) => {  // get soil analysis by land id
  try {
    const landId =  req?.params.landId;
    if(landId){
      const analysisResult = await SoilAnalysis.find({ land_id: landId }); 
      if (analysisResult.length > 0) {
        res.status(200).json(analysisResult);
      } else {
        res.status(500).json({message: "No soil analysis found with the given land id."});
      }
    } else {
      res.status(500).json({message: "Enter land id"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSoilAnalysis = async (req, res) => {   // get soil analysis by own id
  try {
    let result;
    const analysisId = req.params.id;
    if (analysisId) { // analysisId varsa döndürür
      result = await SoilAnalysis.findById(analysisId);
    } else { // yoksa tüm soil analizlerini döndürür
      result = await SoilAnalysis.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Soil analysis not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
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
    getAllSoilAnalyses,
    getSoilAnalysis,
    createSoilAnalysis,
    deleteSoilAnalysis,
    updateSoilAnalysis,
}
