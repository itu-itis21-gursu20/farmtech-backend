const Report = require("../models/Report.js");

const getReport = async (req, res) => {
  try {
    const landId =  req?.params.landId;
    if(landId){
      const report = await Report.find({ land_id: landId }); // gets all Reports which have entered phoneNumber in its numList
      console.log(report);
      if (report.length > 0) {
        res.status(200).json(report);
      } else {
        res.status(500).json({message: "No report found with the given land id."});
      }
    }
  } catch (error) {
    console.error('Error finding report:', error);
    return null;
  }
};

const createReport = async (req, res) => {
  try {
    const newReport = new Report({ land_id: req.params.landId, ...req.body });
    const savedReport = await newReport.save();

    res.status(201).json({
      message: 'Report created successfully!',
      data: savedReport
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating Report',
      error: error.message
    });
  }
};

const deleteReport = async (req, res) => { // girilen idye göre siler
  try {
    const reportId = req.params.id;
    const deletedReport = await Report.findByIdAndRemove(ReportId);

    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({
      message: 'Report deleted successfully',
      data: deletedReport
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Report',
      error: error.message
    });
  }
};

const updateReport = async (req, res) => { // girilen idye göre günceller
  try {
    const reportId = req.params.id;
    const updateData = req.body;
    const updatedReport = await Report.findByIdAndUpdate(ReportId, updateData, { new: true });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({
      message: 'Report updated successfully',
      data: updatedReport
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Report',
      error: error.message
    });
  }
}


module.exports = {
    getReport,
    createReport,
    deleteReport,
    updateReport,
}
