const Refund = require("../models/Refund.js");

const getRefund = async (req, res) => {
  try {
    const landId =  req?.params.landId;
    if(landId){
      const refund = await Refund.find({ land_id: landId }); // gets all Refunds which have entered phoneNumber in its numList
      console.log(refund);
      if (refund.length > 0) {
        res.status(200).json(refund);
      } else {
        res.status(500).json({message: "No Refund found with the given land id."});
      }
    }
  } catch (error) {
    console.error('Error finding Refund:', error);
    return null;
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
    getRefund,
    createRefund,
    deleteRefund,
    updateRefund,
}
