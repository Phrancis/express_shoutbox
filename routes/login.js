"use strict"
const bodyParser = require("body-parser")
const User = require("../lib/user")


exports.form = function(req, res) {
  res.render("login", { title: "Login" })
}

exports.submit = function(req, res, next) {
  const data = req.body.user
  // check credentials
  User.authenticate(data.name, data.pass, function(err, user) {
    // delegate errors
    if (err) return next(err)
    // handle user with valid credentials
    if (user) {
      // store uid for authentication
      req.session.uid = user.id
      // redirect to entry listing
      res.redirect("/")
    } else {
      // TODO after manually testing, the login always returns "Sorry! Invalid credentials." even with valid credentials
      // expose an error message
      res.error("Sorry! Invalid credentials.")
      // redirect back to login form
      res.redirect("back")
    }
  })
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) throw err
    res.redirect("/")
  })
}