// routes/auth-routes.js

const express 		= require('express')
const authRoutes 	= express.Router()
const passport 		= require('passport')
const bcrypt 			= require('bcryptjs')

// require the user model
const User = require('../models/User')

authRoutes.post('/signup', (req, res, next) => {

	const { email, username, password, runnerType, helperType, stravaLink, personalLink} = req.body

	if (!email || !password) {
		res.status(400).json({ message: 'Provide email and password' })
		return
	}

	if (password.length < 7) {
		res
			.status(400)
			.json({ message: 'Please make your password at least 8 characters long for security purposes.' })
		return
	}

	User.findOne({ email }, (err, foundUser) => {
		if (err) {
			res.status(500).json({ message: 'Email check went bad.' })
			return
		}

		if (foundUser) {
			res.status(400).json({ message: 'Email taken. Choose another one.' })
			return
		}

		const salt = bcrypt.genSaltSync(10)
		const hashPass = bcrypt.hashSync(password, salt)

		const aNewUser = new User({
			email, username, password: hashPass, runnerType, helperType, stravaLink, personalLink
		})

		aNewUser.save((err) => {
			if (err) {
				res.status(400).json({ message: 'Saving user to database went wrong.' })
				return
			}

			// Automatically log in user after sign up
			// .login() here is actually predefined passport method
			req.login(aNewUser, (err) => {
				if (err) {
					res.status(500).json({ message: 'Login after signup went bad.' })
					return
				}

				// Send the user's information to the frontend
				// We can use also: res.status(200).json(req.user)
				res.status(200).json(aNewUser)
			})
		})
	})
})

authRoutes.post('/login', passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout()
  res.status(200).json({ message: 'Log out success!' })
})

authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user)
      return
  }
  res.json({ })
})

module.exports = authRoutes