const express = require('express')
const router  = express.Router()

const Like = require("../models/Like")
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
})

router.get('/getUser/:id', (req, res)=>{

  User.findById(req.params.id)
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

/* GET: ALL RUNNERS */
router.get('/all-runners', (req, res)=>{
  User.find({})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
})

module.exports = router;
