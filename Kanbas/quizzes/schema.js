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
    shuffleAnswers: Boolean,
    QuizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",},
    Minutes: Number,
    AccessCode: Number,
    timeLimitCheck: Boolean,
    multipleAttempts: Boolean,
    showCorrectAnswersCheck: Boolean,
    showCorrectAnswers: Date,
    OneQuestionAtATime: Boolean,
    WebCam: Boolean,
    lockQuestionAfterAnswering: Boolean,
    category: {
      type: String,
      enum: ["ASSIGNMENTS", "QUIZZES", "EXAM", "PROJECT"],
      default: "ASSIGNMENTS",},
  },
  { collection: "quizzes" });
export default quizSchema;