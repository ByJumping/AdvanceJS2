const express = require("express");
const fs = require("fs");
const router = express.Router();
const handler = require("./handler");
const stats = require("./stats");

router.get("/", (req, res) => {
  fs.readFile("dist/server/db/userCart.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.post("/", (req, res) => {
  handler(req, res, "add", "dist/server/db/userCart.json");
  stats(req, "addGoodsToCart", "dist/server/db/stats.json");
});

router.put("/:id", (req, res) => {
  handler(req, res, "change", "dist/server/db/userCart.json");
  stats(req, "plusOneGoods", "dist/server/db/stats.json");
});

router.put("/:id/minus", (req, res) => {
  handler(req, res, "minus", "dist/server/db/userCart.json");
  stats(req, "minusOneGoods", "dist/server/db/stats.json");
});

router.delete("/:id", (req, res) => {
  handler(req, res, "remove", "dist/server/db/userCart.json");
  stats(req, "deleteGoods", "dist/server/db/stats.json");
});

module.exports = router;
