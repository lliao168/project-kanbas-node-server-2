import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createCourse = (course) => {
    delete course._id;
    course._id = uuidv4();
    return model.create(course);
  } 
export const fetchAllCourses = () => model.find();
export const fetchCourseById = (courseId) => model.findById(courseId);
export const fetchCourseByName = (name) =>  model.findOne({ name: name });
export const updateCourse = (courseId, course) =>  model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
