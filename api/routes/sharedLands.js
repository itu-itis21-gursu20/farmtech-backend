const express = require("express");

const {    
    getAllLands,
    getLand,
    createLand,
    deleteLand,
    updateLand,
} = require("../controllers/sharedLand.js");

const router = express.Router();

router.post("/", createLand);
router.put("/:landId", updateLand);
router.delete("/:landId", deleteLand);
router.get("/:phoneNumber?", getAllLands);
router.get("/find/:landId?", getLand);

module.exports = router;

