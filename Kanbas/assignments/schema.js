import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    _id: String,
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ["ASSIGNMENTS", "QUIZZES", "EXAM", "PROJECT"],
        default: "ASSIGNMENTS",},
    course: String,
    points: Number,
    dueDate: Date,
    availableFromDate: Date,
    availableUntilDate: Date,
  },
  { collection: "assignments" });
export default assignmentSchema;

