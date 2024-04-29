const express = require("express");

const {    
    getRefund,
    getAllRefunds,
    createRefund,
    deleteRefund,
    updateRefund,
} = require("../controllers/refund.js");

const router = express.Router();

router.post("/:landId?", createRefund);
router.put("/:id", updateRefund);
router.delete("/:id", deleteRefund);
router.get("/find/:id?", getRefund); // get refunds by their own id
router.get("/:landId?", getAllRefunds); // get Refunds by land id

module.exports = router;

