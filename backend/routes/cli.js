const express = require('express')
const { ls_controller, cd_controller } =  require('../controllers/cli')
// const { spawn } = require('child_process')

const router = express.Router() //TODO how does this differ from app?

//HELPER
router.get('/ls', ls_controller)

router.post('/cd', cd_controller)

router.get('/pwd', (req, res) => {
  res.send(PWD)
})

router.get('/test', (req, res) => {
  res.send(PWD)
})


module.exports = router