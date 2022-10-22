const { exec, execSync } = require('child_process')
// const { spawn } = require('child_process')

// TODO probably doesn't need to be async
  // though this might be useful for more time intensive tasks?

const format_output = (str) => {
  obj = {
    stdout : str.split('\n').slice(0, -1)
  }
  return obj
}




// const stdout = async (cmd_txt, res) => {

//   const cmd = spawn(cmd_txt)
//   // cmd.stdout.on('data', data => {console.log(`${data}`)})
//   let out
//   cmd.stdout.on('data', (data) => {
//     out = format_output(`${data}`)  // TODO ask on SO how to set outside variable
//     res.json(out)
//     }
//   )
//   // res.json(out)
    
  
//   }

const output_async = (cmd_txt, res) => {
  exec(cmd_txt, (error, stdout, stderr) => {
    if (error) {
      res.json(format_output(`${error.message}`))
    }
    if (stderr) {
      res.json(format_output(`${stderr}`))
    }
    res.json(format_output(`${stdout}`))
  })
}


const output = (cmd_txt) => {
  let out
  try {
    out = format_output(execSync(cmd_txt).toString())
  }
  catch (err) {
    out = format_output(err.toString())
  }

  return out
}

module.exports = output