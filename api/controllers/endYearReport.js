const EndYearReport = require("../models/EndYearReport.js");

const getAllEndYearReports = async (req, res) => {  // get end year reports by land id
  try {
    const landId =  req?.params.landId;
    if(landId){
      const reportResult = await EndYearReport.find({ land_id: landId }); 
      if (reportResult.length > 0) {
        res.status(200).json(reportResult);
      } else {
        res.status(500).json({message: "No end year report found with the given land id."});
      }
    } else {
      res.status(500).json({message: "Enter land id"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const getEndYearReport = async (req, res) => {   // get end year report by own id
  try {
    let result;
    const reportId = req.params.id;
    if (reportId) { // reportId varsa döndürür
      result = await EndYearReport.findById(reportId);
    } else { // yoksa tüm raporları döndürür
      result = await EndYearReport.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'End year report not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
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
    getAllEndYearReports,
    getEndYearReport,
    createEndYearReport,
    deleteEndYearReport,
    updateEndYearReport,
}
