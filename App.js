// const express = require('express');
import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
const DB_CONNECTION_STRING="mongodb+srv://lliao26:2358901Bingo@cluster0.vekd8xb.mongodb.net/kanbas?retryWrites=true&w=majority&appName=Cluster0";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
import UserRoutes from "./Users/routes.js";
import "dotenv/config";
import session from "express-session";
import QuizRoutes from "./Kanbas/quizzes/routes.js";
import QuizQuestionRoutes from "./Kanbas/quizQuestions/routes.js";
const app = express();
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
        // origin: "http://localhost:3000",
      })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  console.log("Session Secret:", process.env.SESSION_SECRET);
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }  
  app.use(
    session(sessionOptions)
  );  
app.use(express.json());
const port = process.env.PORT || 4000;
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
QuizQuestionRoutes(app)
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);