import * as dao from "./dao.js";

function QuizRoutes(app) {
  const createQuiz = async (req, res) => {
    const {courseId} = req.params;
    const quiz = await dao.createQuiz(courseId, req.body);
    res.json(quiz);
  };
  app.post("/api/courses/:courseId/quizzes", createQuiz);

  const deleteQuiz = async (req, res) => {
    const status = await dao.deleteQuiz(req.params.quizId);
    res.json(status);
   };

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
    return;
   };

   const findQuizById = async (req, res) => {
    const quiz = await dao.findQuizById(req.params.quizId);
    res.json(quiz);
   };

   const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.updateQuiz(quizId, req.body);
    const currentQuiz = await dao.findQuizById(quizId);
    req.session['currentQuiz'] = currentQuiz;
    res.json(status);
   };
  //  app.put("/api/quizs/:aid", (req, res) => {
  //   const { aid } = req.params;
  //   const quizIndex = db.quizs.findIndex(
  //     (a) => a._id === aid);
  //   db.quizs[quizIndex] = {
  //     ...db.quizs[quizIndex],
  //     ...req.body
  //   };
  //   res.sendStatus(204);
  // });
 
  //  app.delete("/api/quizs/:aid", (req, res) => {
  //   const { aid } = req.params;
  //   db.quizs = db.quizs.filter((a) => a._id !== aid);
  //   res.sendStatus(200);
  //   });
  
  // app.post("/api/courses/:cid/quizs", (req, res) => {
  //   const { cid } = req.params;
  //   const newquiz = {
  //     ...req.body,
  //     course: cid,
  //     _id: new Date().getTime().toString(),
  //   };
  //   db.quizs.push(newquiz);
  //   res.send(newquiz);
  // });
  
  // app.get("/api/courses/:cid/quizs", (req, res) => {
  //   const { cid } = req.params;
  //   const quizs = db.quizs.filter((a) => a.course === cid);
  //   res.send(quizs);
  // });
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
export default QuizRoutes;

