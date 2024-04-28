const express = require("express");

const {    
    createFarmer, 
    updateFarmerByPhoneNumber,
    deleteFarmerByPhoneNumber,
    getFarmer,
} = require("../controllers/farmer.js");

const router = express.Router();

router.post("/", createFarmer);
router.put("/:phoneNumber", updateFarmerByPhoneNumber);
router.delete("/:phoneNumber", deleteFarmerByPhoneNumber);
router.get("/:phoneNumber?", getFarmer);

module.exports = router;

