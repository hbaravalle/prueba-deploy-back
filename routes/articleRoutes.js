const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Rutas relacionadas a los artículos:
// ...

router.get("/", articleController.index);
router.post("/", articleController.store);
router.get("/:id", articleController.show);
router.patch("/:id", articleController.update);
router.delete("/:id", articleController.destroy);

module.exports = router;
