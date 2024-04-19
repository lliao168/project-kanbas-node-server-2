import * as dao from "./dao.js";

function QuizQuestionRoutes(app) {
  const createQuestion = async (req, res) => {
    const {quizId} = req.params;
    const question = await dao.createQuestion(quizId, req.body);
    res.json(question);
  };
  app.post("/api/quizzes/:quizId/questions", createQuestion);

  const deleteQuestion = async (req, res) => {
    const status = await dao.deleteQuestion(req.params.questionId);
    res.json(status);
   };

  const findQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
    return;
   };

   const findQuestionById = async (req, res) => {
    const question = await dao.findQuestionById(req.params.questionId);
    res.json(question);
   };

   const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    const currentQuestion = await dao.findQuestionById(questionId);
    req.session['currentQuestion'] = currentQuestion;
    res.json(status);
   };
   
   const addChoice = async (req, res) => {
        try {
            const { questionId } = req.params;
            const choice = req.body;
            const status = await dao.addChoiceAnswer(questionId, choice);
            res.json({ success: true, status: status });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    const addTrueFalse = async (req, res) => {
        try {
            const { questionId } = req.params;
            const { isTrue } = req.body;  
            const status = await dao.addTrueFalseAnswer(questionId, isTrue);
            res.json({ success: true, status: status });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    const addBlank = async (req, res) => {
        try {
            const { questionId } = req.params;
            const blank = req.body;
            const status = await dao.addBlankAnswer(questionId, blank);
            res.json({ success: true, status: status });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    const updateChoice = async (req, res) => {
        try {
            const { questionId } = req.params; 
            const status = await dao.updateChoiceAnswer(questionId, req.body);
            res.json({ success: true, status: status });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    const updateTrueFalse = async (req, res) => {
        try {
            const { questionId } = req.params; 
            const status = await dao.updateTrueFalseAnswer(questionId, req.body);
            res.json({ success: true, status: status });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    const updateBlank = async (req, res) => {
        try {
            const { questionId } = req.params; 
            const status = await dao.updateBlankAnswer(questionId, req.body);
            res.json({ success: true, status: status });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    const deleteChoice = async (req, res) => {
        try {
            const { questionId , choiceId } = req.params;  
            const result = await dao.deleteChoiceAnswer(questionId, choiceId);
            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: "No choice found with provided ID." });
            }
            res.json({ success: true, message: "Choice deleted successfully." });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    const deleteBlank = async (req, res) => {
        try {
            const { questionId, blankId } = req.params;  
            const result = await dao.deleteBlankAnswer(questionId, blankId);
            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: "No blank found with provided ID." });
            }
            res.json({ success: true, message: "Blank deleted successfully." });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
  app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.get("/api/questions/:questionId", findQuestionById);
  app.put("/api/questions/:questionId", updateQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
  app.post("/api/questions/:questionId/fillBlanks", addBlank);
  app.post("/api/questions/:questionId/trueFalse", addTrueFalse);
  app.post("/api/questions/:questionId/multipleChoices", addChoice);
  app.put("/api/questions/:questionId/multipleChoices/:choiceId", updateChoice);
  app.put("/api/questions/:questionId/trueFalse", updateTrueFalse);
  app.put("/api/questions/:questionId/fillBlanks/:blankId", updateBlank);
  app.delete("/api/questions/:questionId/multipleChoices/:choiceId", deleteChoice);
  app.delete("/api/questions/:questionId/fillBlanks/:blankId", deleteBlank);
  
}
export default QuizQuestionRoutes;

