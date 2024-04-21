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
   app.delete("/api/questions/:questionId", deleteQuestion);
   
   const deleteAllQuestionsByQuizId = async (req, res) => {
    const status = await dao.deleteQuestionsByQuizId(req.params.quizId);
    res.json(status);
   };
   app.delete("/api/quizzes/:quizId/questions", deleteAllQuestionsByQuizId); 
  const findQuestionsForQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsForQuiz(quizId);
    res.json(questions);
    return;
   };
   app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);

   const findQuestionById = async (req, res) => {
    const question = await dao.findQuestionById(req.params.questionId);
    res.json(question);
   };
   app.get("/api/questions/:questionId", findQuestionById);


   const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    const currentQuestion = await dao.findQuestionById(questionId);
    req.session['currentQuestion'] = currentQuestion;
    res.json(status);
   };
   app.put("/api/questions/:questionId", updateQuestion);

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
    app.post("/api/questions/:questionId/multipleChoices", addChoice);

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
    app.post("/api/questions/:questionId/trueFalse", addTrueFalse);

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
    app.post("/api/questions/:questionId/fillBlanks", addBlank);

    const updateChoice = async (req, res) => {
        const { questionId, choiceId } = req.params; ;
        const updatedChoice = req.body;
        try {
            const updatedQuestion = await dao.updateChoiceAnswer(questionId, choiceId, updatedChoice);
            res.status(200).json(updatedQuestion); 
        } catch (error) {
            console.error("Error updating choice:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    app.put("/api/questions/:questionId/multipleChoices/:choiceId", updateChoice);

    const updateTrueFalse = async (req, res) => {
        const { questionId, tfId } = req.params; 
        try {
            const updateQuestion = await dao.updateTrueFalseAnswer(questionId, tfId, req.body);
            res.status(200).json(updateQuestion);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    app.put("/api/questions/:questionId/trueFalse/:tfId", updateTrueFalse);

    const updateBlank = async (req, res) => {
        const { questionId, blankId} = req.params; 
        try {
            const updatedAns = await dao.updateBlankAnswer(questionId, blankId, req.body);
            res.status(200).json(updatedAns);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
    app.put("/api/questions/:questionId/fillBlanks/:blankId", updateBlank);

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
    app.delete("/api/questions/:questionId/multipleChoices/:choiceId", deleteChoice);

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
    app.delete("/api/questions/:questionId/fillBlanks/:blankId", deleteBlank);

 
  
     
  
  
  
  
  
  
  
  
  
}
export default QuizQuestionRoutes;

