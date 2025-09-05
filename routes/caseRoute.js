const express = require("express");
const { createCase, getCase, updateCase, deleteCase } = require("../controllers/caseController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware(["admin"]),createCase);
router.get("/",authMiddleware(),getCase);
router.put("/:id",authMiddleware(["admin"]),updateCase);
router.delete("/:id",authMiddleware(["admin"]),deleteCase);


module.exports = router;