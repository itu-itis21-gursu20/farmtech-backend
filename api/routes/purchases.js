const express = require("express");

const {    
    getPurchase,
    getAllPurchases,
    createPurchase,
    deletePurchase,
    updatePurchase,
} = require("../controllers/purchase.js");

const router = express.Router();

router.post("/:landId?", createPurchase);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);
router.get("/find/:id?", getPurchase); // get purchases by their own id
router.get("/:landId?", getAllPurchases); // get purchases by land id

module.exports = router;

