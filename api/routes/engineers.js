const express = require("express");

const {    
    createEngineer, 
    updateEngineerByPhoneNumber,
    deleteEngineerByPhoneNumber,
    getEngineer,
} = require("../controllers/engineer.js");

const router = express.Router();

router.post("/", createEngineer);
router.put("/:phoneNumber", updateEngineerByPhoneNumber);
router.delete("/:phoneNumber", deleteEngineerByPhoneNumber);
router.get("/:phoneNumber?", getEngineer);

module.exports = router;
