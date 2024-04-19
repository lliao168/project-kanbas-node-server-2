import model from "./model.js";
import { v4 as uuidv4 } from 'uuid';

export const createModule = (courseId, module) => {
    delete module._id;
    module._id = uuidv4();
    module.course = courseId;
    courseId = model.find({course: courseId});
    return model.create(module);
  } 
export const findModulesForCourse = (courseId) => model.find({course: courseId});
export const findModuleById = (moduleId) => model.findById(moduleId);
export const updateModule = (moduleId, module) =>  model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
