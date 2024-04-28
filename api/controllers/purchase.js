const Purchase = require("../models/Purchase.js");

const getPurchase = async (req, res) => {
  try {
    const landId =  req?.params.landId;
    if(landId){
      const purchase = await Purchase.find({ land_id: landId }); // gets all purchases which have entered phoneNumber in its numList
      console.log(purchase);
      if (purchase.length > 0) {
        res.status(200).json(purchase);
      } else {
        res.status(500).json({message: "No purchase found with the given land id."});
      }
    }
  } catch (error) {
    console.error('Error finding Purchase:', error);
    return null;
  }
};

const createPurchase = async (req, res) => {
  try {
    console.log("a");
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
    const PurchaseId = req.params.id;
    const deletedPurchase = await Purchase.findByIdAndRemove(PurchaseId);

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
    const PurchaseId = req.params.id;
    const updateData = req.body;
    const updatedPurchase = await Purchase.findByIdAndUpdate(PurchaseId, updateData, { new: true });

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
    getPurchase,
    createPurchase,
    deletePurchase,
    updatePurchase,
}
