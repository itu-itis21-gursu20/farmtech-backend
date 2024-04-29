const express = require("express");

const {    
    getLeafAnalysis,
    getAllLeafAnalyses,
    createLeafAnalysis,
    deleteLeafAnalysis,
    updateLeafAnalysis,
} = require("../controllers/leafAnalysis.js");

const router = express.Router();

router.post("/:landId?", createLeafAnalysis);
router.put("/:id", updateLeafAnalysis);
router.delete("/:id", deleteLeafAnalysis);
router.get("/find/:id?", getLeafAnalysis); // get LeafAnalysis by land id
router.get("/:landId?", getAllLeafAnalyses); // get LeafAnalysis by land id

module.exports = router;