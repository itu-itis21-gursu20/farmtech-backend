const express = require("express");

const {    
    getRefund,
    createRefund,
    deleteRefund,
    updateRefund,
} = require("../controllers/refund.js");

const router = express.Router();

router.post("/:landId?", createRefund);
router.put("/:id", updateRefund);
router.delete("/:id", deleteRefund);
router.get("/:landId?", getRefund); // get Refunds by land id

module.exports = router;

