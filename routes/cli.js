const express = require('express')
const stdout = require('../helper/stdout_err')
// const { spawn } = require('child_process')

// console.log(stdout)
const router = express.Router() //TODO how does this differ from app?
router.get('/ls',  (req, res) => {
//   const ls = spawn('ls')
//   ls.stdout.on('data', data => {
//     res.send(data)
//     })
//DEBUG
//  stdout()
    stdout('ls', res)
  }
)


module.exports = router