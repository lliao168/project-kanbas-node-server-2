import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createQuestion = async (quizId, question) => { 
    // delete question._id;
    // question._id = uuidv4();
    // question.quizId = quizId;
    const maxId = await model.findOne({}, {_id: 1}, {sort: {_id: -1}});
    const numericalPart = maxId ? parseInt(maxId._id.slice(4)) + 1 : 101;
    question._id = "Ques" + numericalPart.toString();
    question.quizId = quizId;
    return model.create(question);
  } 
export const findQuestionsForQuiz = (quizId) => model.find({ quizId : quizId});
export const findQuestionById = (_id) => model.findById(_id);
export const updateQuestion = (questionId, question) =>  model.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });
export const findQuestionsByType = (questionType) => model.find({ questionType: questionType });

export const addChoiceAnswer = async (questionId, choice) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        let newChoiceId;
        if (question.multipleChoice && question.multipleChoice.length > 0) {
            const maxId = question.multipleChoice.reduce((max, choice) => {
                const numericalPart = parseInt(choice._id.replace("Multi", ""));
                return numericalPart > max ? numericalPart : max;
            }, 0);
            newChoiceId = "Multi" + (maxId + 1).toString();
        } else {
            newChoiceId = "Multi1";
        }
        question.multipleChoice.push({...choice, _id: newChoiceId});
        await question.save();
        return question;
    } catch (e) {
        console.error("Error adding answer: ", error);
        throw error;
    }
};
export const addTrueFalseAnswer = async (questionId, isTrue) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        question.trueFalse.push({isTrue, _id: "TF1"});
        await question.save();
        return question;
    } catch (e) {
        console.error("Error adding answer: ", error);
        throw error;
    }
    // return model.updateOne(
    //     { _id: questionId },
    //     { $set: { 'trueFalse.isTrue': { isTrue } } }
    // );
};
export const addBlankAnswer = async (questionId, answer) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        let newChoiceId;
        if (question.fillBlank && question.fillBlank.length > 0) {
            const maxId = question.fillBlank.reduce((max, answer) => {
                const numericalPart = parseInt(answer._id.replace("Fill", ""));
                return numericalPart > max ? numericalPart : max;
            }, 0);
            newChoiceId = "Fill" + (maxId + 1).toString();
        } else {
            newChoiceId = "Fill1";
        }
        question.fillBlank.push({...answer, _id: newChoiceId});
        await question.save();
        return question;
    } catch (e) {
        console.error("Error adding answer: ", error);
        throw error;
    }
};
export const updateChoiceAnswer = async (questionId, choiceId, choice) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        const choiceIndex = question.multipleChoice.findIndex(choice => choice._id === choiceId);
        if (choiceIndex === -1) {
            throw new Error("Choice Not Found");
        }
        question.multipleChoice[choiceIndex] = { ...choice, _id: choiceId };
        await question.save();
        return question;
    } catch (error) {
        console.error("Error updating choice: ", error);
        throw error;
    }
};
export const updateTrueFalseAnswer = async (questionId, TFid, isTrue) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        const TFIndex = question.trueFalse.findIndex(tf => tf._id === TFid);
        if (TFIndex === -1) {
            throw new Error("Choice Not Found");
        }
        question.trueFalse[TFIndex] = { ...isTrue, _id: TFid };
        await question.save();
        return question;
    } catch (error) {
        console.error("Error updating choice: ", error);
        throw error;
    }
};
export const updateBlankAnswer = async (questionId, blankId, answer) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        const blankIndex = question.fillBlank.findIndex(blank => blank._id === blankId);
        if (blankIndex === -1) {
            throw new Error("Choice Not Found");
        }
        question.fillBlank[blankIndex] = { ...answer, _id: blankId };
        await question.save();
        return question;
    } catch (error) {
        console.error("Error updating choice: ", error);
        throw error;
    }
};
export const deleteChoiceAnswer = async (questionId, choiceId) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        const choiceIndex = question.multipleChoice.findIndex(choice => choice._id === choiceId);
        if (choiceIndex === -1) {
            throw new Error("Choice Not Found");
        }
        question.multipleChoice.splice(choiceIndex, 1);
        
        await question.save();
        
        return question;
    } catch (error) {
        console.error("Error deleting choice: ", error);
        throw error;
    }
};
export const deleteBlankAnswer = async (questionId, answerId) => {
    try {
        const question = await model.findById(questionId);
        if (!question) {
            throw new Error("Question Not Found");
        }
        const answerIndex = question.fillBlank.findIndex(answer => answer._id === answerId);
        if (answerIndex === -1) {
            throw new Error("Choice Not Found");
        }
        question.fillBlank.splice(answerIndex, 1);
        
        await question.save();
        
        return question;
    } catch (error) {
        console.error("Error deleting choice: ", error);
        throw error;
    }
};



