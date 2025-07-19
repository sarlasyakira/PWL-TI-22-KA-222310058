const express = require("express");
const router = express.Router();
const msgController = require("../controllers/msg.controller");

router.get("/chats", msgController.getAllChats);
router.put("/chats/:id", msgController.updateChat);
router.delete("/chats/:id", msgController.deleteChat);

module.exports = router;
