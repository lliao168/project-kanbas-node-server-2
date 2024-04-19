import mongoose from "mongoose";
const choiceSchema = new mongoose.Schema({
    question: {type: String, required: true},
    choices: [{
        _id: {type: String, },
        text: {type: String, },
        isCorrect:{type: Boolean, default: false}
    }]
});
const trueFalseSchema = new mongoose.Schema({
    question: {type: String,},
    _id: {type: String, },
    isTrue: {type: Boolean, }
});
const blankSchema = new mongoose.Schema({
    question: {type: String, },
    blanks: [{
        _id: {type: String, },
        correctAnswers: [{type: String, }],
        caseInsensitive: {type: Boolean, default: false}
    }]
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
    multipleChoice: {
        choices: [choiceSchema]  
    },
    trueFalse: [trueFalseSchema],
    fillBlank: {
        fillBlank: [blankSchema]
    },
  },
  { collection: "quiz questions" });
export default quizQuestionSchema;