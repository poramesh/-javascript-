if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  
  const passport = require('passport')
  console.log("passport after requering",passport)
  
  const flash = require('express-flash')
  console.log("flash after requering express-flash",flash)

  const session = require('express-session')
  console.log("session after requering express-session", session)
 
  const methodOverride = require('method-override')
  const initializePassport = require('./passport-config')
  console.log("intialisepassport after requering it", initializePassport)
  
  initializePassport(
    passport, //this is the passport we are configuring
    email => users.find(user => user.email === email), //returns email
    id => users.find(user => user.id === id)
  )
  
  const users = []
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: 'jello', //process.env.SESSION_SECRET //we would have this in the .env file and we have loaded the env variabnle in dotenv
    resave: false, //if nothing has changed we dont want to resave it
    saveUninitialized: false //do you want to save emoty value in the session if there are in no value , we dont actually want to do that
  }))
  
  app.use(passport.initialize()) // Initialize Passport.js not realted to passport-config.js

  app._router.stack.forEach((layer, index) => {
    if (layer.handle) {
        console.log(`Layer ${index}:`, layer.handle.name || 'Anonymous Function');
    }
});
console.log("passport-",passport)

/***
 * Layer 0: query
Layer 1: expressInit
Layer 2: urlencodedParser
Layer 3: Anonymous Function
Layer 4: session
Layer 5: initialize
 */

  app.use(passport.session())
  console.log('session-__',passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', { 
    //authenticate is a passport middleware and we are gonna setup the localstrategy and we are gonna pass in the list of thing that we want to modify , where do we go if we are scuess
    //Passport’s authenticate middleware calls the configured LocalStrategy.
    
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  

  /*
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })


  delete will be baiscally be overridden by /delete?_method to delete instread of POST 
*/

  app.delete('/logout', function(req, res, next){
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
    });
    });
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {  //the req.isAuthenticated() method is a function provided by Passport.js.
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(3000)




  // npm run devstart to run the app :)