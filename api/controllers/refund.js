const Refund = require("../models/Refund.js");

const getAllRefunds = async (req, res) => {  // get refunds by land id
  try {
    const landId =  req?.params.landId;
    if(landId){
      const refundResult = await Refund.find({ land_id: landId }); 
      if (refundResult.length > 0) {
        res.status(200).json(refundResult);
      } else {
        res.status(500).json({message: "No refunds found with the given land id."});
      }
    } else {
      res.status(500).json({message: "Enter land id"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRefund = async (req, res) => {   // get refund by own id
  try {
    let result;
    const refundId = req.params.id;
    if (refundId) { // refundId varsa döndürür
      result = await Refund.findById(refundId);
    } else { // yoksa tüm refunds döndürür
      result = await Refund.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Refund not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
};


const createRefund = async (req, res) => {
  try {
    const newRefund = new Refund({ land_id: req.params.landId, ...req.body });
    const savedRefund = await newRefund.save();

    res.status(201).json({
      message: 'Refund created successfully!',
      data: savedRefund
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating Refund',
      error: error.message
    });
  }
};

const deleteRefund = async (req, res) => { // girilen idye göre siler
  try {
    const refundId = req.params.id;
    const deletedRefund = await Refund.findByIdAndRemove(RefundId);

    if (!deletedRefund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    res.json({
      message: 'Refund deleted successfully',
      data: deletedRefund
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Refund',
      error: error.message
    });
  }
};

const updateRefund = async (req, res) => { // girilen idye göre günceller
  try {
    const refundId = req.params.id;
    const updateData = req.body;
    const updatedRefund = await Refund.findByIdAndUpdate(refundId, updateData, { new: true });

    if (!updatedRefund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    res.json({
      message: 'Refund updated successfully',
      data: updatedRefund
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Refund',
      error: error.message
    });
  }
}


module.exports = {
    getAllRefunds,
    getRefund,
    createRefund,
    deleteRefund,
    updateRefund,
}
