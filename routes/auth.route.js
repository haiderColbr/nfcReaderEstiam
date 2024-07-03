const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Assuming you have a User model and NFC_Card model
const User = require("../models/User");
const NFCCard = require("../models/NFCCard");

// NFC authentication route
router.post(
  "/nfc",
  [check("NFC_CardID", "NFC_CardID is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { NFC_CardID } = req.body;

    try {
      const nfcCard = await NFCCard.findOne({ NFC_CardID });
      if (!nfcCard) {
        return res.status(400).json({ msg: "NFC card not found" });
      }

      const user = await User.findById(nfcCard.UserID);
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Broadcast the token to all connected WebSocket clients
      req.broadcastToken(token);

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
