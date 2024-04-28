const express = require("express");

const {    
    getLeafAnalysis,
    createLeafAnalysis,
    deleteLeafAnalysis,
    updateLeafAnalysis,
} = require("../controllers/leafAnalysis.js");

const router = express.Router();

router.post("/:landId?", createLeafAnalysis);
router.put("/:id", updateLeafAnalysis);
router.delete("/:id", deleteLeafAnalysis);
router.get("/:landId?", getLeafAnalysis); // get LeafAnalysis by land id

module.exports = router;