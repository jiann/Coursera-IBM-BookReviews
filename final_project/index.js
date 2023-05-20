const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const users = require('./router/auth_users.js').users;
const doesExist = require('./router/auth_users.js').isValid;

const app = express();

app.use(session({secret:"fingerpint"}))
app.use(express.json());
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

app.get('/a',function (req, res) {
    res.send(users)
  });

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running "+PORT));
