// routes/messageRoutes.js
import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", createMessage);   // POST form submission
router.get("/", getMessages);      // GET all messages (admin view)

export default router;
