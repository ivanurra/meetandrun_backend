const express = require('express')
const router  = express.Router()

const Like = require("../models/Like")
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
})

router.get("/all-helpers", (req, res) => {
  User.find({runnerType: 'helper'})
  .then(allHelpers => {
    res.json({allHelpers})
  })
})

router.get("/all-runners", (req, res) => {
  User.find({runnerType: 'runner'})
  .then(allRunners => {
    if(allRunners.length === 0){
      res.json({allRunners: 'none'})
    }
    else {
      res.json({allRunners})
    }
  })
})

router.get("/coaches", (req, res) => {
  User.find({runnerType: 'helper', helperType: 'coach'})
  .then(allCoaches => {
    res.json({allCoaches})
  })
})

router.get("/men", (req, res) => {
  User.find({runnerType: 'helper', helperType: 'man'})
  .then(allMen => {
    res.json({allMen})
  })
})

router.get("/women", (req, res) => {
  User.find({runnerType: 'helper', helperType: 'woman'})
  .then(allWomen => {
    res.json({allWomen})
  })
})

router.post("/like", (req, res) => {
  let runnerEmail = req.body.runnerEmail
  let helperEmail = req.body.helperEmail
  User.update(
    {email: runnerEmail},
    {$addToSet: {likedRunners: helperEmail}}
  ).exec().then(save=>res.end())
})

router.post("/unlike", (req, res) => {
  let runnerEmail = req.body.runnerEmail
  let helperEmail = req.body.helperEmail
  User.update(
    {email: runnerEmail},
    {$pull: {likedRunners: helperEmail}}
  ).exec().then(save=>res.end())
})

router.post("/runner-profile", (req, res) => {
  let runnerId = req.body.runnerId
  console.log(runnerId)
  User.findOne({_id: runnerId})
  .then(runner => 
    res.json({runner})
  )
})

router.post("/liked-runners", (req, res) => {
  User.find({email: req.body.currentUser})
  .then(runners =>
    res.json({runners})
  )
})

module.exports = router

// router.get('/getUser/:id', (req, res)=>{

//   User.findById(req.params.id)
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })

// /* GET: ALL RUNNERS */
// router.get('/all-runners', (req, res)=>{
//   User.find({})
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     res.send(err)
//   })
// })


