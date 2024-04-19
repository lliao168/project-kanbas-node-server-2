import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    course: String,
    category: String,
    category2: String,
    category3: String,
  },
  { collection: "modules" });
export default moduleSchema;

