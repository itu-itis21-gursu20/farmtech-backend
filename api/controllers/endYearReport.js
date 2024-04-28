const EndYearReport = require("../models/EndYearReport.js");

const getEndYearReport = async (req, res) => {
  try {
    const landId =  req?.params.landId;
    if(landId){
      const endYearReport = await EndYearReport.find({ land_id: landId }); // gets all EndYearReports which have entered phoneNumber in its numList
      console.log(endYearReport);
      if (endYearReport.length > 0) {
        res.status(200).json(endYearReport);
      } else {
        res.status(500).json({message: "No endYearReport found with the given land id."});
      }
    }
  } catch (error) {
    console.error('Error finding EndYearReport:', error);
    return null;
  }
};

const createEndYearReport = async (req, res) => {
  try {
    const newEndYearReport = new EndYearReport({ land_id: req.params.landId, ...req.body });
    const savedEndYearReport = await newEndYearReport.save();

    res.status(201).json({
      message: 'EndYearReport created successfully!',
      data: savedEndYearReport
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating EndYearReport',
      error: error.message
    });
  }
};

const deleteEndYearReport = async (req, res) => { // girilen idye göre siler
  try {
    const endYearReportId = req.params.id;
    const deletedEndYearReport = await EndYearReport.findByIdAndRemove(endYearReportId);

    if (!deletedEndYearReport) {
      return res.status(404).json({ message: 'EndYearReport not found' });
    }

    res.json({
      message: 'EndYearReport deleted successfully',
      data: deletedEndYearReport
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting EndYearReport',
      error: error.message
    });
  }
};

const updateEndYearReport = async (req, res) => { // girilen idye göre günceller
  try {
    const endYearReportId = req.params.id;
    const updateData = req.body;
    const updatedEndYearReport = await EndYearReport.findByIdAndUpdate(endYearReportId, updateData, { new: true });

    if (!updatedEndYearReport) {
      return res.status(404).json({ message: 'EndYearReport not found' });
    }

    res.json({
      message: 'EndYearReport updated successfully',
      data: updatedEndYearReport
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating EndYearReport',
      error: error.message
    });
  }
}


module.exports = {
    getEndYearReport,
    createEndYearReport,
    deleteEndYearReport,
    updateEndYearReport,
}
