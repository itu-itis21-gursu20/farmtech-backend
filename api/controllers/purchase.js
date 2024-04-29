const Purchase = require("../models/Purchase.js");

const getAllPurchases = async (req, res) => {  // get purchases by land id
  try {
    const landId =  req?.params.landId;
    if(landId){
      const purchaseResult = await Purchase.find({ land_id: landId }); 
      if (purchaseResult.length > 0) {
        res.status(200).json(purchaseResult);
      } else {
        res.status(500).json({message: "No purchase found with the given land id."});
      }
    } else {
      res.status(500).json({message: "Enter land id"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPurchase = async (req, res) => {   // get purchase by own id
  try {
    let result;
    const purchaseId = req.params.id;
    if (purchaseId) { // purchaseId varsa döndürür
      result = await Purchase.findById(purchaseId);
    } else { // yoksa tüm purchases döndürür
      result = await Purchase.find({});
    }

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Purchase not found.' });
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
};


const createPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase({ land_id: req.params.landId, ...req.body });
    const savedPurchase = await newPurchase.save();

    res.status(201).json({
      message: 'Purchase created successfully!',
      data: savedPurchase
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating Purchase',
      error: error.message
    });
  }
};

const deletePurchase = async (req, res) => { // girilen idye göre siler
  try {
    const purchaseId = req.params.id;
    const deletedPurchase = await Purchase.findByIdAndRemove(purchaseId);

    if (!deletedPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json({
      message: 'Purchase deleted successfully',
      data: deletedPurchase
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Purchase',
      error: error.message
    });
  }
};

const updatePurchase = async (req, res) => { // girilen idye göre günceller
  try {
    const purchaseId = req.params.id;
    const updatedData = req.body;
    const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, updatedData, { new: true });

    if (!updatedPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json({
      message: 'Purchase updated successfully',
      data: updatedPurchase
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Purchase',
      error: error.message
    });
  }
}


module.exports = {
    getAllPurchases,
    getPurchase,
    createPurchase,
    deletePurchase,
    updatePurchase,
}
