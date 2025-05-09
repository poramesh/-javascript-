const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialise(passport, getUserByEmail, getUserById) {

  const authenticateUser =  (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      console.log("sdfs")
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if ( bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  console.log("AM I HER")
  passport.serializeUser((user, done) => done(null, user.id))
  console.log("asdsadasdsa")
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })

}

module.exports = initialise

/*
In Passport.js, the done callback function plays a crucial role in the authentication flow. It is used to indicate
 the result of the authentication process to Passport.js, and it handles the flow of user data through serialization
  and deserialization. 

The done callback function takes up to three arguments:

Error: The first argument is used to indicate an error if one occurred during the authentication process. If 
there was no error, this should be null.

User: The second argument represents the user object if authentication is successful. If authentication fails 
(such as when no user is found), this should be false (or null if there’s no user object).

Info: The third argument is optional and can provide additional information about the authentication process, 
such as failure messages or other relevant details.
 */