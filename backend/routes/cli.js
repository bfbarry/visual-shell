/*
 THIS FILE CURRENTLY HAS CONTROLLERS AND ROUTES
 * 
 */

const express = require('express')
const fs = require('fs')
const output = require('../helper/stdout_err')
// const { spawn } = require('child_process')

// console.log(stdout)
const router = express.Router() //TODO how does this differ from app?
router.get('/ls',  (req, res) => {
  res.json(output(`ls ${PWD}`))
  }
)

router.post('/cd', (req, res)=> {
  let { target } = req.body
  let dir_text
  let append_flag = false
  //TODO ls /home not working
  if (target[0] == '~') {
    target = target.replace('~', process.env.HOME)
  }
  if (target[0] == '/') { 
    dir_text = target
  } else {
    dir_text = PWD + '/' + target
  }
  if (! fs.existsSync(dir_text)) {
    res.json({err:`cd: no such file or directory: ${target}`})
  } else {
    if (append_flag) {
      PWD += dir_text
    } else {
      PWD = dir_text
    }
    res.json(output(`ls ${PWD}`))
  }
})


router.get('/pwd', (req, res) => {
  res.send(PWD)
})

router.get('/test', (req, res) => {
  res.send(PWD)
})


module.exports = router