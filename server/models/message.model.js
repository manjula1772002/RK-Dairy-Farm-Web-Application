import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true },
  message: { type: String, required: true, minlength: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Message= mongoose.model("messages", contactSchema);
export default Message;