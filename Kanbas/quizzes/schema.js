import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    _id: String,
    title: { type: String, required: true},
    description: { type: String, required: true},
    course: String,
    points: Number,
    dueDate: Date,
    availableFromDate: Date,
    availableUntilDate: Date,
    pts: Number,
    Questions: Number,
    isPublished: Boolean,
    shuffleAnswer: Boolean,
    QuizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",},
    Minutes: Number,
    AccessCode: Number,
  },
  { collection: "quizzes" });
export default quizSchema;