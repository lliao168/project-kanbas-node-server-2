import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true, unique: true },
    courseNumber: { type: String, required: true },
    term: String,
    number: String,
    startDate: Date,
    endDate: Date,
    termCode: String,
    image: String,
  },
  { collection: "courses" });
export default courseSchema;

