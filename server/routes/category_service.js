const { CategoryService } = require("../controller/index.js");
const express = require("express");
const router = express.Router();

router.get("/search", CategoryService.findOne);

router.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
