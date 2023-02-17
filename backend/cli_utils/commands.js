const fs = require('fs')
const { opendir } = require ('fs/promises')
const { spawn } = require('child_process')

const { sub_tilde, isCode } = require('./helpers')
// const output = require('../cli_utils/stdout_err')


const ls = async (path) => {
  if (path === undefined) { //basically default arg if no path given
    path = PWD
  }
  console.log(path)
  let contents = [{
                  name  : '..', 
                  isdir : true,
                  iscode: false,
                  path  : path.split('/').slice(0,-1).join('/')
                }]

    try {
      const dir = await opendir(sub_tilde(path)) // loop over contents of dir, and set special file attributes
      for await (const dirent of dir){
        contents.push({name  : dirent.name, 
                       isdir : dirent.isDirectory(),
                       iscode: isCode(path + '/' + dirent.name),
                       path  : path + '/' + dirent.name}) // full path, used to cd
      }
    } catch (err) {
      console.error(err)
    }
  return contents
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
  /*
  target: $`pwd`/filename
   */
  //on ls backend check if is code file using list of extensions
  const pwd = target.split('/').slice(0, -1).join('/')
  const child = spawn(`code ${pwd} && code ${target}`, {shell:true})

  child.stderr.on('data', function (data) {
    console.error("STDERR:", data.toString());
  });
  child.stdout.on('data', function (data) {
    console.log("STDOUT:", data.toString());
  });
  child.on('exit', function (exitCode) {
    console.log("Child exited with code: " + exitCode);
  });

}

module.exports = {
  ls,
  cd,
  code
}