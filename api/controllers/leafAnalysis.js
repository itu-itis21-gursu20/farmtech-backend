const LeafAnalysis = require("../models/LeafAnalysis.js");

const getLeafAnalysis = async (req, res) => {
  try {
    const number =  req?.params.number;
    console.log("number",number);
    if(number){
      const leafAnalysis = await LeafAnalysis.find({numList: number}); // gets all LeafAnalysiss which have entered phoneNumber in its numList
      console.log(leafAnalysis);
      if (leafAnalysis.length > 0) {
        res.status(200).json(leafAnalysis);
      } else {
        res.status(500).json({message: "No LeafAnalysis found with the given phone number."});
      }
    }
  } catch (error) {
    console.error('Error finding LeafAnalysis:', error);
    return null;
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
    getLeafAnalysis,
    createLeafAnalysis,
    deleteLeafAnalysis,
    updateLeafAnalysis,
}
