import * as dao from "./dao.js";
// let currentUser = null;
let globalCurrentuser;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
   };
   app.post("/api/users", createUser);
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
   };
  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
   };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
   };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
   };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
        res.status(400).json(
          { message: "Username already taken" });
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      console.log(req.session);
      res.json(currentUser);  
   };
   const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };  
  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  }; 
  const signin = async (req, res) => { 
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
        // res.status(400).json({ message: "Invalid credentials" });
        // return;
        req.session["currentUser"] = currentUser;
        // console.log(req.session);
        // globalCurrentuser = currentUser;
        res.json(currentUser);
      } else {
        res.sendStatus(401);
      }
    
};
  const signout = (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
   };
  const profile = async (req, res) => { 
    res.json(req.session['currentUser']);
  // const currentUser = req.session["currentUser"];
  // console.log(req.session);
  // currentUser = globalCurrentuser;
  //  if (!currentUser) {
  //   res.sendStatus(401);
  //    return;
  //  }
  //   res.json(currentUser);
  };
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }; 
  
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

