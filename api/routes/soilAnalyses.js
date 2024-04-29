const express = require("express");

const {    
    getSoilAnalysis,
    getAllSoilAnalyses,
    createSoilAnalysis,
    deleteSoilAnalysis,
    updateSoilAnalysis,
} = require("../controllers/soilAnalysis.js");

const router = express.Router();

router.post("/:landId?", createSoilAnalysis);
router.put("/:id", updateSoilAnalysis);
router.delete("/:id", deleteSoilAnalysis);
router.get("/find/:id?", getSoilAnalysis); // get SoilAnalysis by land id
router.get("/:landId?", getAllSoilAnalyses); // get SoilAnalysis by land id

module.exports = router;