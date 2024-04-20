import mongoose from "mongoose";
const choiceSchema = new mongoose.Schema({
    _id: {type: String},
    text: {type: String},
    isCorrect:{type: Boolean, default: false}  
});
const trueFalseSchema = new mongoose.Schema({
    _id: {type: String, },
    isTrue: {type: Boolean, }
});
const blankSchema = new mongoose.Schema({
    _id: {type: String, },
    correctAnswers: {type: String, },
    caseInsensitive: {type: Boolean, default: false}
});
const quizQuestionSchema = new mongoose.Schema({
    _id: String,
    quizId: {type: String, required: true},
    title: { type: String, required: true},
    question: {type: String, required: true},
    points: Number,
    questionType: { 
        type: String,
        required: true,
        enum: ["Multiple Choice", "True/False", "Fill In the Blank"],
        default: "Multiple Choice",},
    multipleChoice:[choiceSchema],
    trueFalse: [trueFalseSchema],
    fillBlank: [blankSchema],
  },
  { collection: "quiz questions" });
export default quizQuestionSchema;