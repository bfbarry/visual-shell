const express = require('express')
const { ls_controller, cd_controller, code_controller } =  require('../controllers/cli')

const router = express.Router() //TODO how does this differ from app?

//HELPER
router.get('/ls', ls_controller)

router.post('/cd', cd_controller)

router.get('/pwd', (req, res) => {
  res.send(PWD)
})

router.post('/code', code_controller) //post because sends target

router.get('/test', (req, res) => {
  res.send(PWD)
})


module.exports = router