import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createQuestion = async (quizId, question) => { 
    delete question._id;
    question._id = uuidv4();
    question.quizId = quizId;
    return model.create(question);
  } 
export const findQuestionsForQuiz = (quizId) => model.find({ quizId : quizId});
export const findQuestionById = (questionId) => model.findById(questionId);
export const updateQuestion = (questionId, question) =>  model.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });
export const findQuestionsByType = (questionType) => model.find({ questionType: questionType });
export const addChoiceAnswer = (questionId, choice) => {
    delete choice._id;
    choice._id = uuidv4();
    return model.updateOne(
        { _id: questionId },
        { $push: { 'multipleChoice.choices': choice } }
    );
};
export const addTrueFalseAnswer = (questionId, isTrue) => {
    return model.updateOne(
        { _id: questionId },
        { $set: { 'trueFalse.isTrue': { isTrue } } }
    );
};
export const addBlankAnswer= (questionId, blank) => {
    delete blank._id;
    blank._id = uuidv4();
    return model.updateOne(
        { _id: questionId },
        { $push: { 'fillBlank.blanks': blank } }
    );
};
export const updateChoiceAnswer = (questionId, choice) => {
    return model.updateOne(
        { _id: questionId },
        { $set: { 'multipleChoice.choices': choice } }
    );
};
export const updateTrueFalseAnswer = (questionId, isTrue) => {
    return model.updateOne(
        { _id: questionId },
        { $set: { 'trueFalse.isTrue': isTrue } }
    );
};
export const updateBlankAnswer = (questionId, blank) => {
    return model.updateOne(
        { _id: questionId },
        { $set: { 'fillBlank.blanks': blank } }
    );
};
export const deleteChoiceAnswer = (questionId, choice) => {
    return model.updateOne(
        { _id: questionId },
        { $pull: { 'multipleChoice.choices': choice } }
    );
};
export const deleteBlankAnswer = (questionId, blank) => {
    return model.updateOne(
        { _id: questionId },
        { $pull: { 'fillBlank.blanks': blank } }
    );
};



