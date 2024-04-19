import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  const createAssignment = async (req, res) => {
    const {courseId} = req.params;
    const assignment = await dao.createAssignment(courseId, req.body);
    res.json(assignment);
  };
  app.post("/api/courses/:courseId/assignments", createAssignment);

  const deleteAssignment = async (req, res) => {
    const status = await dao.deleteAssignment(req.params.assignmentId);
    res.json(status);
   };

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
    return;
   };

   const findAssignmentById = async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.assignmentId);
    res.json(assignment);
   };

   const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    const currentAssignment = await dao.findAssignmentById(assignmentId);
    req.session['currentAssignment'] = currentAssignment;
    res.json(status);
   };
  //  app.put("/api/assignments/:aid", (req, res) => {
  //   const { aid } = req.params;
  //   const assignmentIndex = db.assignments.findIndex(
  //     (a) => a._id === aid);
  //   db.assignments[assignmentIndex] = {
  //     ...db.assignments[assignmentIndex],
  //     ...req.body
  //   };
  //   res.sendStatus(204);
  // });
 
  //  app.delete("/api/assignments/:aid", (req, res) => {
  //   const { aid } = req.params;
  //   db.assignments = db.assignments.filter((a) => a._id !== aid);
  //   res.sendStatus(200);
  //   });
  
  // app.post("/api/courses/:cid/assignments", (req, res) => {
  //   const { cid } = req.params;
  //   const newAssignment = {
  //     ...req.body,
  //     course: cid,
  //     _id: new Date().getTime().toString(),
  //   };
  //   db.assignments.push(newAssignment);
  //   res.send(newAssignment);
  // });
  
  // app.get("/api/courses/:cid/assignments", (req, res) => {
  //   const { cid } = req.params;
  //   const assignments = db.assignments.filter((a) => a.course === cid);
  //   res.send(assignments);
  // });
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
export default AssignmentRoutes;

