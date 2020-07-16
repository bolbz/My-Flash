const express = require("express");
const router = express.Router();

const User = require("../../models/User/User");

router.post("/deleteAccount/:apikey", function (req, res) {

  User.deleteOne({ apikey: req.params.apikey }).then(
    res.json()
  )
});

module.exports = router;
