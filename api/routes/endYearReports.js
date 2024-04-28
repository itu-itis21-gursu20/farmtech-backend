const express = require("express");

const {    
    getEndYearReport,
    createEndYearReport,
    deleteEndYearReport,
    updateEndYearReport,
} = require("../controllers/endYearReport.js");

const router = express.Router();

router.post("/:landId?", createEndYearReport);
router.put("/:id", updateEndYearReport);
router.delete("/:id", deleteEndYearReport);
router.get("/:landId?", getEndYearReport); // get EndYearReports by land id

module.exports = router;

