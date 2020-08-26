const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = [
  {
    id:1,
    email:"john@gmail.com",
    pass:"123123",
    name:"John"
  },
  {
    id:2,
    email:"alex@gmail.com",
    pass:"123123",
    name:"Alex"
  }
]

app.post('/login', (req, res) =>{
  const user = users.find( user => user.email === req.body.email)
  if(user){
    if(user.pass == req.body.pass){
      const token = jwt.sign({
        id:user.id
      },
      'ThisIsTopSecret',
      {
        expiresIn:'10h'
      })
      res.header('auth-header', token).send(user.name+' Logged In! '+token);
    }
    else{
      res.send("Invalid Username or password")
    }
  }
  else{
    res.send('User not found please register!')
  }
})

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', verify, (req, res) => {
  const user = users.find( user => user.id === req.user.id)
  res.send('Welcome to Dashboard '+ user.name)
})

app.get('/admin', verify, (req, res) => {
  res.send('Admin Page')
})


app.listen(3000);