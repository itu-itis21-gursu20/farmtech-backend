const Report = require("../models/Report.js");

const getAllReports = async (req, res) => {  // get reports by land id
  try {
    const landId =  req?.params.landId;
    if(landId){
      const reportResult = await Report.find({ land_id: landId }); 
      if (reportResult.length > 0) {
        res.status(200).json(reportResult);
      } else {
        res.status(500).json({message: "No report found with the given land id."});
      }
    } else {
      res.status(500).json({message: "Enter land id"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getReport = async (req, res) => {   // get report by own id
  try {
    let result;
    const reportId = req.params.id;
    if (reportId) { // reportId varsa döndürür
      result = await Report.findById(reportId);
    } else { // yoksa tüm reports döndürür
      result = await Report.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Report not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
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
    getAllReports,
    createReport,
    deleteReport,
    updateReport,
}
