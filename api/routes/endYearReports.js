const express = require("express");

const {    
    getEndYearReport,
    getAllEndYearReports,
    createEndYearReport,
    deleteEndYearReport,
    updateEndYearReport,
} = require("../controllers/endYearReport.js");

const router = express.Router();

router.post("/:landId?", createEndYearReport);
router.put("/:id", updateEndYearReport);
router.delete("/:id", deleteEndYearReport);
router.get("/find/:id?", getEndYearReport); // get endyearreports by their own id
router.get("/:landId?", getAllEndYearReports); // get EndYearReports by land id

module.exports = router;

