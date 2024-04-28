const express = require("express");
//const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken.js');
const {    
    createFarmer, 
    updateFarmerByPhoneNumber,
    deleteFarmerByPhoneNumber,
    getFarmer,
} = require("../controllers/farmer.js");

const router = express.Router();

// router.put("/:id", verifyTokenAndAuthorization, updateFarmer);
// router.delete("/:id", verifyTokenAndAuthorization, deleteFarmer);
// router.get("/find/:id", getFarmer);
// router.get("/find/mahmut/:imageId", getFarmerByImage);
// router.get("/", getAllFarmers);
// router.get("/findMultiple", getFarmerDetails);

// router.put("/follow/:id", verifyTokenAndAuthorization, follow); // buradaki id takip edilecek olanın FarmerId dir
// router.put("/unfollow/:id", verifyTokenAndAuthorization, unfollow);

router.post("/", createFarmer);
router.put("/:phoneNumber", updateFarmerByPhoneNumber);
router.delete("/:phoneNumber", deleteFarmerByPhoneNumber);
router.get("/:phoneNumber?", getFarmer);

module.exports = router;

