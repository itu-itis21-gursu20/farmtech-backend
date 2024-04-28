const express = require("express");

const {    
    getReport,
    createReport,
    deleteReport,
    updateReport,
} = require("../controllers/report.js");

const router = express.Router();

router.post("/:landId?", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);
router.get("/:landId?", getReport); // get Reports by land id

module.exports = router;

