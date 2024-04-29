const express = require("express");

const {    
    getReport,
    getAllReports,
    createReport,
    deleteReport,
    updateReport,
} = require("../controllers/report.js");

const router = express.Router();

router.post("/:landId?", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);
router.get("/find/:id?", getReport); // get reports by their own id
router.get("/:landId?", getAllReports); // get Reports by land id

module.exports = router;

