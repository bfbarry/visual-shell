const { spawn } = require('child_process')


const format_output = (str) => {
  obj = {
    stdout : str.split('\n').slice(0, -1)
  }
  return obj
}


const stdout = async (cmd_txt, res) => {

  const cmd = spawn(cmd_txt)
  // cmd.stdout.on('data', data => {console.log(`${data}`)})
  let out
  cmd.stdout.on('data', (data) => {
    out = format_output(`${data}`)  // TODO ask on SO how to set outside variable
    res.json(out)
    }
  ).then()
  // res.json(out)
    
  
  }

module.exports = stdout