const express = require("express");
//const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken.js');
const {    
    createEngineer, 
    updateEngineer,
    deleteEngineer,
    getEngineer,
} = require("../controllers/engineer.js");

const router = express.Router();

// router.put("/:id", verifyTokenAndAuthorization, updateEngineer);
// router.delete("/:id", verifyTokenAndAuthorization, deleteEngineer);
// router.get("/find/:id", getEngineer);
// router.get("/find/mahmut/:imageId", getEngineerByImage);
// router.get("/", getAllEngineers);
// router.get("/findMultiple", getEngineerDetails);

// router.put("/follow/:id", verifyTokenAndAuthorization, follow); // buradaki id takip edilecek olanın EngineerId dir
// router.put("/unfollow/:id", verifyTokenAndAuthorization, unfollow);

router.post("/", createEngineer);
router.put("/:id", updateEngineer);
router.delete("/:id", deleteEngineer);
router.get("/:id", getEngineer);

module.exports = router;

// paramstaki id EngineerId değilse sıkıntı olur verifytokenlara bak
