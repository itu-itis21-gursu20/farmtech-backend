const express = require("express");

const {    
    getSoilAnalysis,
    createSoilAnalysis,
    deleteSoilAnalysis,
    updateSoilAnalysis,
} = require("../controllers/soilAnalysis.js");

const router = express.Router();

router.post("/:landId?", createSoilAnalysis);
router.put("/:id", updateSoilAnalysis);
router.delete("/:id", deleteSoilAnalysis);
router.get("/:landId?", getSoilAnalysis); // get SoilAnalysis by land id

module.exports = router;