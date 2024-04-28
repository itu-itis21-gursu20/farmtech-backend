const express = require("express");

const {    
    getLand,
    createLand,
    deleteLand,
    updateLand,
} = require("../controllers/sharedLand.js");

const router = express.Router();

router.post("/", createLand);
router.put("/:id", updateLand);
router.delete("/:id", deleteLand);
router.get("/:number?", getLand);

module.exports = router;

