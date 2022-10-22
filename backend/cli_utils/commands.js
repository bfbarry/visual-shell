const fs = require('fs')
const { opendir } = require ('fs/promises')

const { sub_tilde } = require('../cli_utils/str_format')
// const output = require('../cli_utils/stdout_err')


const ls = async (path) => {
  if (path === undefined) {
    path = PWD
  }
  let dirs = []
    try {
      const dir = await opendir(sub_tilde(path))
      for await (const dirent of dir)
        dirs.push({name: dirent.name, 
                  isdir: dirent.isDirectory(),
                  path: path + '/' + dirent.name}) // full path, used to cd
    } catch (err) {
      console.error(err)
    }
  return dirs
}


const cd = async (target) => {
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
    return {err:`cd: no such file or directory: ${target}`}
  } else {
    if (append_flag) {
      PWD += dir_text
    } else {
      PWD = dir_text
    }
    return await ls(PWD)
  }
}


const code = (target) => {
  //on frontend check if is code file using list of extensions
  //code . && code $file
}

module.exports = {
  ls,
  cd
}