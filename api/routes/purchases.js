const express = require("express");

const {    
    getPurchase,
    createPurchase,
    deletePurchase,
    updatePurchase,
} = require("../controllers/purchase.js");

const router = express.Router();

router.post("/:landId?", createPurchase);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);
router.get("/:landId?", getPurchase); // get purchases by land id

module.exports = router;

