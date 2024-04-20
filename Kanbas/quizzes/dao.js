import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createQuiz = async (courseId, quiz) => {
    // delete quiz._id;
    // quiz._id = uuidv4();
    // quiz.course = courseId;
    // courseId = model.find({course: courseId});
    const maxId = await model.findOne({}, {_id: 1}, {sort: {_id: -1}});
    const numericalPart = maxId ? parseInt(maxId._id.slice(1)) + 1 : 101;
    quiz._id = "Q" + numericalPart.toString();
    quiz.course = courseId;
    return model.create(quiz);
  } 
export const findQuizzesForCourse = (courseId) => model.find({course: courseId});
export const findQuizById = (quizId) => model.findById(quizId);
export const updateQuiz = (quizId, quiz) =>  model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findQuizzesByQuizType = (quizType) => model.find({ quizType: quizType });