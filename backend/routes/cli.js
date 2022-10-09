/*
 THIS FILE CURRENTLY HAS CONTROLLERS AND ROUTES
 * 
 */

const express = require('express')
const fs = require('fs')
const { opendir } = require ('fs/promises')
const output = require('../helper/stdout_err')
const { sub_tilde } = require('../helper/str_format')
// const { spawn } = require('child_process')

// console.log(stdout)
const router = express.Router() //TODO how does this differ from app?

//HELPER
router.get('/ls',  async (req, res) => {
  // this functionality should go in another function
  // so it can be used by different controllers
  let dirs = []
  try {
    const dir = await opendir(sub_tilde(PWD))
    for await (const dirent of dir)
      dirs.push({name: dirent.name, 
                 isdir: dirent.isDirectory(),
                path: PWD + '/' + dirent.name}) // full path, used to cd
  } catch (err) {
    console.error(err)
  }
  res.json(dirs)
  }
)

router.post('/cd', (req, res)=> {
  let { target } = req.body
  let dir_text
  let append_flag = false
  //TODO ls /home not working
  target = sub_tilde(target)
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