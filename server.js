const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
app.set('view engine', 'ejs')

const verify = require('./middlewares/verifyToken')

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

app.get('/login', (req,res) =>{
  res.render('login')
})

app.post('/login', async (req, res) =>{
  const user = await users.find( user => user.email === req.body.email)
  if(user){
    if(user.pass == req.body.pass){
      const token = await jwt.sign({
        id:user.id
      },
      'ThisIsTopSecret',
      {
        expiresIn:'10h'
      })
      res.status(201).json({
        id: user.id,
        token: token,
        message: "success"
    })
    }
    else{
      res.status(401).json({message:"Invalid Username or password"})
    }
  }
  else{
          res.status(401).json({message:"User not found please register!"})
  }
})

app.get('/dashboard', verify, (req, res) => {
  // const user = users.find( user => user.id === req.user.id)
  res.render('dashboard')
})

app.get('/', (req, res) => {
  res.render('home')
})


app.listen(3000);