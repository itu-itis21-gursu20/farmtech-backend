const LeafAnalysis = require("../models/LeafAnalysis.js");

const getAllLeafAnalyses = async (req, res) => {  // get leaf analysis by land id
  try {
    const landId =  req?.params.landId;
    if(landId){
      const analysisResult = await LeafAnalysis.find({ land_id: landId }); 
      if (analysisResult.length > 0) {
        res.status(200).json(analysisResult);
      } else {
        res.status(500).json({message: "No leaf analysis found with the given land id."});
      }
    } else {
      res.status(500).json({message: "Enter land id"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const getLeafAnalysis = async (req, res) => {   // get leaf analysis by own id
  try {
    let result;
    const analysisId = req.params.id;
    if (analysisId) { // analysisId varsa döndürür
      result = await LeafAnalysis.findById(analysisId);
    } else { // yoksa tüm yaprak analizlerini döndürür
      result = await LeafAnalysis.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Leaf analysis not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
};


const createLeafAnalysis = async (req, res) => {
  try {
    const newLeafAnalysis = new LeafAnalysis({ land_id: req.params.landId, ...req.body });
    const savedLeafAnalysis = await newLeafAnalysis.save();

    res.status(201).json({
      message: 'LeafAnalysis created successfully!',
      data: savedLeafAnalysis
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating LeafAnalysis',
      error: error.message
    });
  }
};

const deleteLeafAnalysis = async (req, res) => { // girilen idye göre siler
  try {
    const leafAnalysisId = req.params.id;
    const deletedLeafAnalysis = await LeafAnalysis.findByIdAndRemove(leafAnalysisId);

    if (!deletedLeafAnalysis) {
      return res.status(404).json({ message: 'LeafAnalysis not found' });
    }

    res.json({
      message: 'LeafAnalysis deleted successfully',
      data: deletedLeafAnalysis
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting LeafAnalysis',
      error: error.message
    });
  }
};

const updateLeafAnalysis = async (req, res) => { // girilen idye göre günceller
  try {
    const LeafAnalysisId = req.params.id;
    const updateData = req.body;
    const updatedLeafAnalysis = await LeafAnalysis.findByIdAndUpdate(LeafAnalysisId, updateData, { new: true });

    if (!updatedLeafAnalysis) {
      return res.status(404).json({ message: 'LeafAnalysis not found' });
    }

    res.json({
      message: 'LeafAnalysis updated successfully',
      data: updatedLeafAnalysis
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating LeafAnalysis',
      error: error.message
    });
  }
}


module.exports = {
    getAllLeafAnalyses,
    getLeafAnalysis,
    createLeafAnalysis,
    deleteLeafAnalysis,
    updateLeafAnalysis,
}
