import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createAssignment = (courseId, assignment) => {
    delete assignment._id;
    assignment._id = uuidv4();
    assignment.course = courseId;
    courseId = model.find({course: courseId});
    return model.create(assignment);
  } 
export const findAssignmentsForCourse = (courseId) => model.find({course: courseId});
export const findAssignmentById = (assignmentId) => model.findById(assignmentId);
export const updateAssignment = (assignmentId, assignment) =>  model.updateOne({ _id: assignmentId }, { $set: assignment });
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });
export const findAssignmentsByCategory = (category) => model.find({ category: category });