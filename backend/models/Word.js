import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  definition: { type: String, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: false }
});

export default mongoose.model("Word", WordSchema);