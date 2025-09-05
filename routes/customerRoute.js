const express = require("express");
const { createCustomer, getCustomer, updateCustomer, deleteCustomer, getAllCustomer } = require("../controllers/customerController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authMiddleware(["admin"]),createCustomer);
router.get("/",authMiddleware(),getCustomer);
router.put("/:id",authMiddleware(["admin"]),updateCustomer);
router.delete("/:id",authMiddleware(["admin"]),deleteCustomer);


module.exports = router;